import { Button, Flex, Modal, TableColumnsType } from "antd";
import { useEffect, useMemo, useState } from "react";
import { getThermistorChainMeasurements, ThermistorChainMeasurement } from "../../api/termo";

import { ThermistorChainChart } from "./ThermistorChainChart";
import { filterMeasurementsByDates } from "../../utils/filterMeasurementsByDates";
import { MeasurementTable } from "../MeasurementTable/MeasurementTable";
import { createDateColumn } from "../../utils/columns/dateColumn";
import { ThermistorChainTrendLine } from "./ThermistorChainTrendLine";

const getAllDepths = (measurements: ThermistorChainMeasurement[]): string[] => {
  return Array.from(
    measurements.reduce<Set<string>>((acc, measurement) => {
      return new Set([...acc, ...Object.keys(measurement.data)]);
    }, new Set())
  ).sort((a, b) => Number(a) - Number(b));
};

type ModalContent = "common" | "trend" | null;

export const ThermistorChain = () => {
  const [selectedDates, setSelectedDates] = useState<[string, string] | null>(null);
  const [measurements, setMeasurements] = useState<ThermistorChainMeasurement[]>([]);
  const [openModal, setOpenModal] = useState<ModalContent>(null);

  const showModal = (modal: ModalContent) => {
    setOpenModal(modal);
  };

  const handleCancel = () => {
    setOpenModal(null);
  };

  useEffect(() => {
    getThermistorChainMeasurements().then((res) => {
      setMeasurements(
        res.data.map((item) => {
          item.key = item.time;

          return item;
        })
      );
    });
  }, []);

  const filteredMeasurements = useMemo(
    () => filterMeasurementsByDates(measurements, selectedDates),
    [measurements, selectedDates]
  );

  const depthColumns = useMemo(() => getAllDepths(measurements), [measurements]);

  const dateColumn = useMemo(
    () =>
      createDateColumn<ThermistorChainMeasurement>((_, dateStrings) => {
        const [startDate, endDate] = dateStrings;

        setSelectedDates(startDate && endDate ? dateStrings : null);
      }),
    [setSelectedDates]
  );

  const expandedColumns: TableColumnsType<ThermistorChainMeasurement> = useMemo(
    () => [
      dateColumn,
      {
        title: "Te",
        width: 60,
        dataIndex: "averageTemperature",
        key: "averageTemperature",
        fixed: "left",
        render: (value: number) => {
          return value.toFixed(2);
        },
      },
      {
        title: "Глубина, м",
        children: depthColumns.map((depth) => ({
          title: depth,
          width: 60,
          dataIndex: depth,
          key: depth,
          render: (_, measurement) => {
            return measurement.data[depth]?.value.toFixed(2) || "";
          },
        })),
      },
    ],
    [dateColumn, depthColumns]
  );

  return (
    <>
      <>
        <Flex gap={16}>
          <Button type="primary" onClick={() => showModal("common")}>
            График распределения температур по глубине
          </Button>
          <Button type="primary" onClick={() => showModal("trend")}>
            График линии тренда и Te
          </Button>
        </Flex>
        <Modal width={850} open={!!openModal} onCancel={handleCancel} footer={null}>
          {openModal === "common" ? (
            <ThermistorChainChart measurements={selectedDates ? filteredMeasurements : measurements} />
          ) : (
            <ThermistorChainTrendLine measurements={selectedDates ? filteredMeasurements : measurements} />
          )}
        </Modal>

        <MeasurementTable columns={expandedColumns} dataSource={measurements} />
      </>
    </>
  );
};

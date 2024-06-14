import { type TableColumnsType } from "antd";
import { FC, useMemo, useState } from "react";

import { createDateColumn } from "../../utils/columns/dateColumn";
import { filterMeasurementsByDates } from "../../utils/filterMeasurementsByDates";
import { MeasurementTable } from "../MeasurementTable/MeasurementTable";
import { DeformationControlMeasurement } from "../../api/deformation";

interface DeformationControlTableProps {
  measurements: DeformationControlMeasurement[];
}

export const DeformationControlTable: FC<DeformationControlTableProps> = ({ measurements }) => {
  const [selectedDates, setSelectedDates] = useState<[string, string] | null>(null);

  const dateColumn = useMemo(
    () =>
      createDateColumn<DeformationControlMeasurement>((_, dateStrings) => {
        const [startDate, endDate] = dateStrings;

        setSelectedDates(startDate && endDate ? dateStrings : null);
      }),
    []
  );

  const expandedColumns: TableColumnsType<DeformationControlMeasurement> = useMemo(
    () => [
      dateColumn,
      {
        title: "Цикл измерения",
        width: 60,
        dataIndex: "index",
      },
      {
        title: "Отметка, м",
        width: 60,
        dataIndex: "data",
        key: "data",
        render: (data: DeformationControlMeasurement["data"]) => {
          return data.value.toFixed(4);
        },
      },

      {
        title: "Δ, м",
        width: 60,
        dataIndex: "data",
        key: "data",
        render: (data: DeformationControlMeasurement["data"]) => {
          return data.delta?.toFixed(4) || "-";
        },
      },
    ],
    [dateColumn]
  );

  const filteredMeasurements = useMemo(
    () => filterMeasurementsByDates(measurements, selectedDates),
    [measurements, selectedDates]
  );

  return (
    <MeasurementTable
      columns={expandedColumns}
      dataSource={selectedDates ? filteredMeasurements : measurements}
      scroll={undefined}
    />
  );
};

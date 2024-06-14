import { Button, Modal, Space } from "antd";
import { useEffect, useState } from "react";

import { DeformationControlMeasurement, getDeformationControlMeasurements } from "../../api/deformation";
import { romanize } from "../../utils/romanize";
import { DeformationControlChart } from "./DeformationControlChart";
import { DeformationControlTable } from "./DeformationControlTable";

export const DeformationControl = () => {
  const [measurements, setMeasurements] = useState<DeformationControlMeasurement[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getDeformationControlMeasurements().then((res) => {
      setMeasurements(
        res.data.map((item, index, array) => {
          item.key = item.time;
          item.index = romanize(array.length - 1 - index) || 0;

          return item;
        })
      );
    });
  }, []);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        График смещения по деформационной марке
      </Button>
      <Space size="small" />

      <Modal width={850} open={isModalOpen} onCancel={handleCancel} footer={null}>
        <DeformationControlChart measurements={measurements} />
      </Modal>

      <DeformationControlTable measurements={measurements} />
    </>
  );
};

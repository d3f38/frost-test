import { Table, TableProps } from "antd";
import { FC } from "react";

import styles from "./MeasurementTable.module.scss";

export const TOP_INDENT_PERCENT = 20;

export const MeasurementTable: FC<TableProps> = (props) => {
  return (
    <Table
      className={styles.table}
      bordered
      size="middle"
      pagination={false}
      showHeader={true}
      scroll={{
        x: 2000,
        y: window.innerHeight - (window.innerHeight * TOP_INDENT_PERCENT) / 100,
      }}
      {...props}
    />
  );
};

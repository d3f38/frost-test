import { DatePicker, Flex } from "antd";
import { ColumnType } from "antd/es/table";
import { RangePickerProps } from "antd/es/date-picker";
import { Measurement } from "../../api/const";

export const createDateColumn = <T extends Measurement>(onChange: RangePickerProps["onChange"]): ColumnType<T> => ({
  title: "Дата и время измерения",
  width: "230px",
  dataIndex: "time",
  key: "time",
  fixed: "left",
  render: (date: string) => {
    return new Date(date).toLocaleString("ru");
  },
  sorter: (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
  filterDropdown: () => (
    <Flex style={{ padding: 8 }} gap={8} align="center">
      <DatePicker.RangePicker format="DD.MM.YYYY" onChange={onChange} />
    </Flex>
  ),
});

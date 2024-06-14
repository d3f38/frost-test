import { Flex, Tabs } from "antd";
import type { TabsProps } from "antd";

import { DeformationControl } from "./components/DeformationControl/DeformationControl";
import { ThermistorChain } from "./components/ThermistorChain/ThermistorChain";

import styles from "./App.module.scss";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "thermistorChain",
    label: "Термокоса",
    children: <ThermistorChain />,
  },
  {
    key: "deformationControl",
    label: "Деформационная марка",
    children: <DeformationControl />,
  },
];

function App() {
  return (
    <Flex className={styles.wrapper}>
      <Tabs className={styles.tabsWrapper} defaultActiveKey="thermistorChain" items={items} onChange={onChange} />
    </Flex>
  );
}

export default App;

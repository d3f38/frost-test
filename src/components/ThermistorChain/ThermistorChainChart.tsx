import { FC } from "react";
import Plot from "react-plotly.js";
import { Data } from "plotly.js";

import { ThermistorChainMeasurement } from "../../api/termo";

interface ThermistorChainChartProps {
  measurements: ThermistorChainMeasurement[];
}

export const ThermistorChainChart: FC<ThermistorChainChartProps> = ({ measurements }) => {
  const data: Data[] = measurements.map((measurement) => ({
    name: new Date(measurement.time).toLocaleString("ru"),
    x: Object.keys(measurement.data).map((key) => measurement.data[key].value),
    y: Object.keys(measurement.data).map((item) => item),
    type: "scatter",
    mode: "lines+markers",
  }));

  return (
    <Plot
      data={data}
      layout={{
        width: 800,
        height: 600,
        title: "Распределение температур по глубине",
        yaxis: {
          title: "Глубина, м",
        },
        xaxis: {
          title: "Температура, °C",
        },
      }}
    />
  );
};

import { FC } from "react";
import Plot from "react-plotly.js";
import { Data } from "plotly.js";

import { ThermistorChainMeasurement } from "../../api/termo";

interface ThermistorChainChartProps {
  measurements: ThermistorChainMeasurement[];
}

export const ThermistorChainChart: FC<ThermistorChainChartProps> = ({ measurements }) => {
  const data: Data[] = measurements.map((measurement) => {
    const deltaValues = Object.keys(measurement.data);
    const date = new Date(measurement.time).toLocaleString("ru");

    return {
      name: date,
      x: deltaValues.map((delta) => measurement.data[delta].value),
      y: deltaValues.map((delta) => delta),
      type: "scatter",
      mode: "lines+markers",
    };
  });

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

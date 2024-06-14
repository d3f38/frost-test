import { FC, useEffect, useMemo, useState } from "react";
import Plot from "react-plotly.js";

import { ThermistorChainMeasurement, ThermistorChainTrendData, getThermistorChainTrendData } from "../../api/termo";

interface ThermistorChainTrendLineProps {
  measurements: ThermistorChainMeasurement[];
}

export const ThermistorChainTrendLine: FC<ThermistorChainTrendLineProps> = ({ measurements }) => {
  const [trendData, setTrendData] = useState<ThermistorChainTrendData | null>(null);

  useEffect(() => {
    getThermistorChainTrendData().then((data) => {
      setTrendData(data.data);
    });
  }, []);

  const maxTemperature = Math.min(...measurements.map((item) => item.averageTemperature));

  const dateRange = useMemo(() => {
    if (!trendData) return [];

    const dates = Object.keys(trendData.points);
    const startDate = dates[0];
    const endDate = dates[dates.length - 2];

    return trendData ? [startDate, endDate] : [];
  }, [trendData]);

  return (
    trendData && (
      <Plot
        data={[
          {
            name: "Тренд Te",
            x: Object.keys(trendData.points),
            y: Object.keys(trendData.points).map((key) => trendData.points[key]),
            type: "scatter",
            mode: "lines+markers",
          },
          {
            name: "Te, °C",
            x: Object.keys(trendData.points),
            y: measurements.map((measurement) => measurement.averageTemperature),
            type: "scatter",
            mode: "lines+markers",
          },
        ]}
        layout={{
          width: 800,
          height: 600,
          title: "Линия тренда и Te",
          yaxis: {
            title: "Температура, °C",
          },
          xaxis: {
            title: "Дата",
            range: dateRange,
          },
          shapes: [
            {
              type: "line",
              xref: "paper",
              x0: 0,
              y0: maxTemperature,
              x1: 1,
              y1: maxTemperature,
              line: {
                color: "rgb(255, 0, 0)",
                width: 2,

                dash: "dot",
              },
            },
          ],
          annotations: [
            {
              showarrow: false,
              text: "Te max, °C",
              align: "right",
              x: dateRange[1],
              xanchor: "right",
              y: maxTemperature,
              yanchor: "bottom",
            },
          ],
        }}
      />
    )
  );
};

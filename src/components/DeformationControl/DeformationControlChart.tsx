import { FC, useEffect, useState } from "react";
import Plot from "react-plotly.js";

import {
  DeformationControlMeasurement,
  DeformationControlTrendData,
  getDeformationControlTrend,
} from "../../api/deformation";

interface DeformationControlChartPops {
  measurements: DeformationControlMeasurement[];
}

export const DeformationControlChart: FC<DeformationControlChartPops> = ({ measurements }) => {
  const maxDelta = Math.max(...measurements.map((item) => item.data.delta || 0));
  const minDelta = Math.min(...measurements.map((item) => item.data.delta || 0).filter((delta) => delta));

  const [trendData, setTrendData] = useState<DeformationControlTrendData | null>(null);

  useEffect(() => {
    getDeformationControlTrend().then((data) => {
      setTrendData(data.data);
    });
  }, []);

  return (
    trendData && (
      <Plot
        data={[
          {
            name: "Δ, м",
            x: measurements.map((item) => item.time),
            y: measurements.map((item) => item.data.delta),
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
          {
            name: "Тренд Δ",
            x: Object.entries(trendData.points).map(([time]) => time),
            y: Object.entries(trendData.points).map(([, delta]) => delta),
            type: "scatter",
            mode: "lines+markers",
          },
        ]}
        layout={{
          width: 800,
          height: 600,
          title: "Смещение по деформационной марке",
          yaxis: {
            range: [minDelta - 0.01, maxDelta * 1.5],
            title: "Смещение (Δ), м",
          },
          xaxis: {
            range: [Object.keys(trendData.points)[0], trendData.criticalEndDate],
            title: "Дата",
          },
          shapes: [
            {
              name: "Мин. Δ, м",
              type: "line",
              xref: "paper",
              x0: 0,
              y0: minDelta,
              x1: 1,
              y1: minDelta,
              line: {
                color: "rgb(255, 0, 0)",
                width: 2,

                dash: "dot",
              },
            },
            {
              type: "line",
              xref: "paper",
              x0: 0,
              y0: maxDelta,
              x1: 1,
              y1: maxDelta,
              line: {
                color: "rgb(0, 255, 0)",
                width: 2,
                dash: "dot",
              },
            },
          ],
          annotations: [
            {
              showarrow: false,
              text: "Макс. Δ, м",
              align: "right",
              x: trendData.criticalEndDate,
              xanchor: "right",
              y: maxDelta,
              yanchor: "bottom",
            },
            {
              showarrow: false,
              text: "Мин. Δ, м",
              align: "right",
              x: trendData.criticalEndDate,
              xanchor: "right",
              y: minDelta,
              yanchor: "bottom",
            },
          ],
        }}
      />
    )
  );
};

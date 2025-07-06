import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  title: string;
  data: any;
  options?: any;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  title,
  data,
  options,
}) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: "500",
          },
        },
        onClick: () => {},
        // onHover: (event: any, legendItem: any, legend: any) => {
        //   const chart = legend.chart;
        //   const meta = chart.getDatasetMeta(0);

        //   // Hide all segments
        //   meta.data.forEach((segment: any, index: number) => {
        //     segment.hidden = index !== legendItem.index;
        //   });

        //   chart.update("none");
        // },
        // onLeave: (event: any, legendItem: any, legend: any) => {
        //   const chart = legend.chart;
        //   const meta = chart.getDatasetMeta(0);

        //   // Show all segments when not hovering
        //   meta.data.forEach((segment: any) => {
        //     segment.hidden = false;
        //   });

        //   chart.update("none");
        // },
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const dataset = context.dataset;
            const total = dataset.data.reduce(
              (sum: number, value: number) => sum + value,
              0
            );
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${
              context.label
            }: ${context.parsed.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "60%",
    ...options,
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-64">
        <Doughnut data={data} options={defaultOptions} />
      </div>
    </div>
  );
};

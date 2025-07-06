import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  title: string;
  data: any;
  options?: any;
}

export const BarChart: React.FC<BarChartProps> = ({ title, data, options }) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: "500",
          },
        },
        // onHover: (event: any, legendItem: any, legend: any) => {
        //   const chart = legend.chart;
        //   const datasets = chart.data.datasets;

        //   // Hide all datasets
        //   datasets.forEach((dataset: any, index: number) => {
        //     chart.setDatasetVisibility(index, false);
        //   });

        //   // Show only the hovered dataset
        //   chart.setDatasetVisibility(legendItem.datasetIndex, true);
        //   chart.update("none");
        // },
        // onLeave: (event: any, legendItem: any, legend: any) => {
        //   const chart = legend.chart;
        //   const datasets = chart.data.datasets;

        //   // Show all datasets when not hovering
        //   datasets.forEach((dataset: any, index: number) => {
        //     chart.setDatasetVisibility(index, true);
        //   });
        //   chart.update("none");
        // },
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          afterLabel: function (context: any) {
            const dataset = context.dataset;
            const total = dataset.data.reduce(
              (sum: number, value: number) => sum + value,
              0
            );
            const percentage = ((context.parsed.y / total) * 100).toFixed(1);
            return `${percentage}%`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#f1f5f9",
          borderDash: [5, 5],
        },
        border: {
          display: false,
        },
      },
    },
    borderRadius: 8,
    borderSkipped: false,
    ...options,
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-64">
        <Bar data={data} options={defaultOptions} />
      </div>
    </div>
  );
};

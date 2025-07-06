import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
  title: string;
  data: any;
  options?: any;
}

export const LineChart: React.FC<LineChartProps> = ({
  title,
  data,
  options,
}) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
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
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 6,
        hoverRadius: 8,
      },
    },
    ...options,
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-64">
        <Line data={data} options={defaultOptions} />
      </div>
    </div>
  );
};

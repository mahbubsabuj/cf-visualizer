import React from "react";
import { Bar } from "react-chartjs-2";
import { useTheme } from "@emotion/react";
import { Chart as ChartJS } from "chart.js/auto";
import { colors } from "../../utils/constants";

const MultiBarChart = ({
  labels,
  data1,
  data2,
  title,
  cfHandle1,
  cfHandle2,
}) => {
  const theme = useTheme();
  const color = theme.palette.text.primary;
  const data = {
    labels: labels,
    datasets: [
      {
        label: cfHandle1,
        backgroundColor: colors[0],
        data: data1,
      },
      {
        label: cfHandle2,
        backgroundColor: colors[1],
        data: data2,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          color: theme.palette.text.primary, 
          font: {
            size: 14,
          },
        },
      },
      x: {
        ticks: {
          color: theme.palette.text.primary,
          font: {
            size: 14,
          },
        },
      },
    },
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: title,
        color: color,
      },
      labels: {
        color: color,
      },
      legend: {
        display: false,
        position: "bottom",
        labels: {
          fontColor: color,
        },
      },
    },
  };
  return <Bar data={data} options={options} />;
};

export default MultiBarChart;

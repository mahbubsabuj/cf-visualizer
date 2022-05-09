import React from "react";
import { Pie, Bar, Line, Doughnut } from "react-chartjs-2";
import { useTheme } from "@emotion/react";
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = ({ chartData, title }) => {
  const theme = useTheme();
  const color = theme.palette.text.primary;
  return (
    <Bar
      data={chartData}
      options={{
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
        responsive: true,
        maintainAspectRatio: false,
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
          legend: {
            display: false,
            position: "bottom",
            labels: {
              color: color,
            },
          },
        },
      }}
    />
  );
};

export default BarChart;

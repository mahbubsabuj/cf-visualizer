import React from "react";
import { useTheme } from "@emotion/react";
import { Pie, Bar, Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";

const PieChart = ({ chartData, title }) => {
  const theme = useTheme();
  const color = theme.palette.text.primary;
  return (
    <Pie
      data={chartData}
      options={{
        animations: {
          tension: {
            duration: 1000,
            easing: "linear",
            from: 1,
            to: 0,
            loop: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: title,
            color: color,
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              color: color,
            }
          },
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: "xy",
            },
          },
        },
      }}
    />
  );
};

export default PieChart;

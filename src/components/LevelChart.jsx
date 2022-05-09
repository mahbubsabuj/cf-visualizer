import React from "react";
import { colors } from "../utils/constants";
import { getLevelListData } from "../utils/dataPrepare";
import BarChart from "./charts/BarChart";

const LevelChart = ({ submissionDetails, handle }) => {
  const ordered = getLevelListData(submissionDetails);
  const chartData = {
    labels: Object.keys(ordered).map((key) => {
      return key;
    }),
    datasets: [
      {
        label: "Solved",
        data: Object.keys(ordered).map((key) => {
          return ordered[key];
        }),
        backgroundColor: colors,
      },
    ],
  };
  return (
    <BarChart chartData={chartData} title={`Problem levels of ${handle}`} />
  );
};

export default LevelChart;

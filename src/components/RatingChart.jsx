import React from "react";
import { colors } from "../utils/constants";
import DoughnutChart from "./charts/DoughnutChart";
import LineChart from "./charts/LineChart";
import BarChart from "./charts/BarChart";
import { getRatingListData } from "../utils/dataPrepare";

const RatingChart = ({ submissionDetails, handle }) => {
  const reduced = getRatingListData(submissionDetails);
  const chartData = {
    labels: Object.keys(reduced),
    datasets: [
      {
        label: `Solved`,
        data: Object.values(reduced),
        backgroundColor: colors,
      },
    ],
  };
  return (
    <BarChart chartData={chartData} title={`Problem ratings of ${handle}`} />
  );
};

export default RatingChart;

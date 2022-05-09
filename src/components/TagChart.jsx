import React from "react";
import PieChart from "./charts/PieChart";
import BarChart from "./charts/BarChart";
import { colors } from "../utils/constants";
import { getTagListData } from "../utils/dataPrepare";

const TagChart = ({ submissionDetails, handle }) => {
  const sorted = getTagListData(submissionDetails);
  const chartData = {
    labels: Object.keys(sorted),
    datasets: [
      {
        label: `Verdicts of ${handle}`,
        data: Object.values(sorted),
        backgroundColor: colors,
      },
    ],
  };
  return <BarChart chartData={chartData} title={`Tags of ${handle}`} />;
};

export default TagChart;

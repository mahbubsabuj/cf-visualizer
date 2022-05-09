import React from "react";
import { colors } from "../utils/constants";
import DoughnutChart from "./charts/DoughnutChart";
import PieChart from "./charts/PieChart";
const VerdictChart = ({ submissionDetails, handle }) => {
  const reduced = Object.values(submissionDetails).reduce(
    (res, { verdict }) => {
        res[verdict] = res[verdict] || { key: verdict, count: 0 };
        res[verdict].count++;
        return res;
    },
    {}
  );
  const keys = [];
  const values = [];
  Object.keys(reduced).forEach((key) => {
    if (reduced[key].key === "OK") {
      keys.push("ACCEPTED");
    } else {
      keys.push(reduced[key].key);
    }
    values.push(reduced[key].count);
  });
  const chartData = {
    labels: keys,
    datasets: [
      {
        label: `Submissions of ${handle}`,
        data: values,
        backgroundColor: colors,
      },
    ],
  };
  return (
    <DoughnutChart chartData={chartData} title={`Verdicts of ${handle}`} />
  );
};

export default VerdictChart;

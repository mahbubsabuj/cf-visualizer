import React from "react";
import { useTheme } from "@emotion/react";
import DataTable from "./DataTable";

function createData(title, value) {
  return { title, value };
}

function createLink(count, id, color) {
  if (id.length === 0) {
    return count;
  }
  // https://codeforces.com/contest/1669/problem/H
  const [contestId, problemId] = String(id).split(" ");
  const problemLink = `https://codeforces.com/contest/${contestId}/problem/${problemId}`;
  return (
    <div>
      {count}(
      <a
        style={{ color: color, fontWeight: "bold" }}
        target="_blank"
        rel="noreferrer"
        href={problemLink}
      >
        {contestId + problemId}
      </a>
      )
    </div>
  );
}

const SubmissionStats = ({ submissionDetails, handle }) => {
  const theme = useTheme();
  const reduced = submissionDetails.reduce(
    (res, { contestId, index, verdict }) => {
      res[contestId + " " + index] = res[contestId + " " + index] || {
        key: contestId + " " + index,
        count: 0,
        acceptedCount: 0,
      };
      res[contestId + " " + index].count++;
      if (verdict === "OK") {
        res[contestId + " " + index].acceptedCount++;
      }
      return res;
    },
    {}
  );
  const totalAttempts = Object.keys(reduced).length;
  let solved = 0,
    maxAttempts = 0,
    solvedWithSingleSubmission = 0,
    maxAcceptedCount = 0,
    totalCount = 0,
    maxAttemptedProblemId = "",
    maxAcceptedProblemId = "";
  Object.keys(reduced).forEach((key) => {
    if (reduced[key].acceptedCount > 0) {
      solved++;
    }
    totalCount += reduced[key].count;
    if (maxAcceptedCount <= reduced[key].acceptedCount) {
      maxAcceptedCount = reduced[key].acceptedCount;
      maxAcceptedProblemId = key;
    }
    if (maxAttempts <= reduced[key].count) {
      maxAttempts = reduced[key].count;
      maxAttemptedProblemId = key;
    }
    if (reduced[key].count === 1 && reduced[key].acceptedCount === 1) {
      solvedWithSingleSubmission++;
    }
  });
  const rows = [
    createData("Tried", totalAttempts),
    createData("Solved", solved),
    createData(
      "Average attempts",
      (totalCount / Math.max(1, solved)).toFixed(3)
    ),
    createData(
      "Max attempts",
      createLink(maxAttempts, maxAttemptedProblemId, theme.palette.text.primary)
    ),
    createData("Solved with single submission", solvedWithSingleSubmission),
    createData(
      "Max Accepted submissions",
      createLink(
        maxAcceptedCount,
        maxAcceptedProblemId,
        theme.palette.text.primary
      )
    ),
  ];
  return <DataTable rows={rows} header={"Submission stats"} handle={handle} />;
};

export default SubmissionStats;

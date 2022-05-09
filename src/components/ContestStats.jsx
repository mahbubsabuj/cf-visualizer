import React from "react";
import { useTheme } from "@emotion/react";
import { createLink } from "../utils/dataPrepare";
import DataTable from "./DataTable";

const ContestStats = ({ handle, contestDetails }) => {
  //       //contestLink, rank, contestId, color
  //title, value
  const theme = useTheme();
  const row = Object.values(contestDetails).reduce((res, contest) => {
    if (contest.value.contestLink) {
      res.push({
        title: contest.title,
        value: createLink(
          contest.value.contestLink,
          contest.value.rank,
          contest.value.contestId,
          theme.palette.text.primary
        ),
      });
    } else {
      res.push(contest);
    }
    return res;
  }, []);

  return (
    <React.Fragment>
      <DataTable
        rows={row}
        header={"Contest stats"}
        handle={handle}
      />
    </React.Fragment>
  );
};

export default ContestStats;

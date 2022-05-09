import React from "react";
import { useTheme } from "@emotion/react";
import MultiBarChart from "./charts/MultiBarChart";
import MultiDataTable from "./MultiDataTable";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import {
  createLink,
  getTagListData,
  combineCount,
  getLevelListData,
  getRatingListData,
  maxTriedCount,
  maxAcceptedCount,
  getSolveWithSingleSubmissionCount,
  getTriedSolvedCount,
  getCommonProblemStats,
} from "../utils/dataPrepare";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const createData = (title, value1, space, value2) => {
  return { title, value1, space, value2 };
};

const MultiChartCompare = ({
  cfHandle1,
  cfHandle2,
  submissionDetails1,
  submissionDetails2,
  contestDetails1,
  contestDetails2,
}) => {
  const theme = useTheme();
  //contest stats of
  //submissions stats of
  //levels, problem ratings, tags
  const tagListCount = combineCount(
    getTagListData(submissionDetails1),
    getTagListData(submissionDetails2)
  );
  const levelListCount = combineCount(
    getLevelListData(submissionDetails1),
    getLevelListData(submissionDetails2)
  );
  const ratingListCount = combineCount(
    getRatingListData(submissionDetails1),
    getRatingListData(submissionDetails2)
  );
  const triedSolvedCount = getTriedSolvedCount(
    submissionDetails1,
    submissionDetails2
  );

  //ARGUMENTS: labels, data1, data2, title
  //get levels
  //problem rating
  //common contest rating curve
  //max submission on a single problem
  const maxTried = maxTriedCount(submissionDetails1, submissionDetails2);
  const maxAccepted = maxAcceptedCount(submissionDetails1, submissionDetails2);
  //solved with one submission
  const solvedWithSingleSubCount = getSolveWithSingleSubmissionCount(
    submissionDetails1,
    submissionDetails2
  );
  //max accepted count on a single problem
  //common problmes tried vs solved
  const commonProblemsTriedAcceptedCount = getCommonProblemStats(
    submissionDetails1,
    submissionDetails2
  );
  //current rating (if doenst have any then set it to 0)
  //number of rated contests
  //numnber of solves
  //best rank + best rank contest
  //worst rank + worst rank contest
  //max up + max up contest
  //max down  + max down contest
  //max rating => implement
  console.log(contestDetails1, contestDetails2);
  const rows = [
    createData(
      "Current rating",
      contestDetails1.currentRating === 0
        ? "N/A"
        : contestDetails1.currentRating,
      " ",
      contestDetails2.currentRating === 0
        ? "N/A"
        : contestDetails2.currentRating
    ),
    createData(
      "Max rating",
      contestDetails1.maxRating,
      " ",
      contestDetails2.maxRating
    ),
    createData(
      "Number of rated contests",
      contestDetails1.ratedCount,
      " ",
      contestDetails2.ratedCount
    ),
    createData("Solve count", triedSolvedCount[1], " ", triedSolvedCount[3]),
    //contestLink, rank, contestId, color
    createData(
      "Best rank",
      contestDetails1.bestRank.contestLink
        ? createLink(
            contestDetails1.bestRank.contestLink,
            contestDetails1.bestRank.rank,
            contestDetails1.bestRank.contestId,
            theme.palette.text.primary
          )
        : "N/A",
      " ",
      contestDetails2.bestRank.contestLink
        ? createLink(
            contestDetails2.bestRank.contestLink,
            contestDetails2.bestRank.rank,
            contestDetails2.bestRank.contestId,
            theme.palette.text.primary
          )
        : "N/A"
    ),
    createData(
      "Worst rank",
      contestDetails1.worstRank.contestLink
        ? createLink(
            contestDetails1.worstRank.contestLink,
            contestDetails1.worstRank.rank,
            contestDetails1.worstRank.contestId,
            theme.palette.text.primary
          )
        : "N/A",
      " ",
      contestDetails2.worstRank.contestLink
        ? createLink(
            contestDetails2.worstRank.contestLink,
            contestDetails2.worstRank.rank,
            contestDetails2.worstRank.contestId,
            theme.palette.text.primary
          )
        : "N/A"
    ),
    createData(
      "Max up",
      contestDetails1.maxUp.contestLink
        ? createLink(
            contestDetails1.maxUp.contestLink,
            contestDetails1.maxUp.rank,
            contestDetails1.maxUp.contestId,
            theme.palette.text.primary
          )
        : "N/A",
      " ",
      contestDetails2.maxUp.contestLink
        ? createLink(
            contestDetails2.maxUp.contestLink,
            contestDetails2.maxUp.rank,
            contestDetails2.maxUp.contestId,
            theme.palette.text.primary
          )
        : "N/A"
    ),
    createData(
      "Max Down",
      contestDetails1.maxDown.contestLink
        ? createLink(
            contestDetails1.maxDown.contestLink,
            contestDetails1.maxDown.rank,
            contestDetails1.maxDown.contestId,
            theme.palette.text.primary
          )
        : "N/A",

      " ",
      contestDetails2.maxDown.contestLink
        ? createLink(
            contestDetails2.maxDown.contestLink,
            contestDetails2.maxDown.rank,
            contestDetails2.maxDown.contestId,
            theme.palette.text.primary
          )
        : "N/A"
    ),
  ];
  console.log(rows);
  return (
    <React.Fragment>
      <MultiDataTable
        header={"Contest & Submission stats"}
        rows={rows}
        handle1={cfHandle1}
        handle2={cfHandle2}
      />
      <Box sx={{ width: "90%" }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 5, sm: 2, md: 2 }}>
          <Grid item xs sm md lg xl>
            <Item elevation={24}>
              <MultiBarChart
                labels={["Tried", "Accepted"]}
                data1={[triedSolvedCount[0], triedSolvedCount[1]]}
                data2={[triedSolvedCount[2], triedSolvedCount[3]]}
                title={`Tried vs Accepted of ${cfHandle1} & ${cfHandle2}`}
                cfHandle1={cfHandle1}
                cfHandle2={cfHandle2}
              />
            </Item>
          </Grid>
          <Grid item xs sm md lg xl>
            <Item elevation={24}>
              <MultiBarChart
                labels={["Unsolved"]}
                data1={[triedSolvedCount[0] - triedSolvedCount[1]]}
                data2={[triedSolvedCount[2] - triedSolvedCount[3]]}
                title={`Unsolve count of ${cfHandle1} & ${cfHandle2}`}
                cfHandle1={cfHandle1}
                cfHandle2={cfHandle2}
              />
            </Item>
          </Grid>
          <Grid item xs sm md lg xl>
            <Item elevation={24}>
              <MultiBarChart
                labels={["Average Attempt"]}
                data1={[
                  (submissionDetails1.length / triedSolvedCount[1]).toPrecision(
                    3
                  ),
                ]}
                data2={[
                  (submissionDetails2.length / triedSolvedCount[3]).toPrecision(
                    3
                  ),
                ]}
                title={`Average Attempt of ${cfHandle1} & ${cfHandle2}`}
                cfHandle1={cfHandle1}
                cfHandle2={cfHandle2}
              />
            </Item>
          </Grid>
          <Grid item xs sm md lg xl>
            <Item elevation={24}>
              <MultiBarChart
                labels={["Max tried"]}
                data1={[maxTried[0]]}
                data2={[maxTried[1]]}
                title={`Max Tried count of ${cfHandle1} & ${cfHandle2}`}
                cfHandle1={cfHandle1}
                cfHandle2={cfHandle2}
              />
            </Item>
          </Grid>
          <Grid item xs sm md lg xl>
            <Item elevation={24}>
              <MultiBarChart
                labels={["Max accepted"]}
                data1={[maxAccepted[0]]}
                data2={[maxAccepted[1]]}
                title={`Max Accepted on a single problem of ${cfHandle1} & ${cfHandle2}`}
                cfHandle1={cfHandle1}
                cfHandle2={cfHandle2}
              />
            </Item>
          </Grid>
          <Grid item xs sm md lg xl>
            <Item elevation={24}>
              <MultiBarChart
                labels={["Solved with single submission"]}
                data1={[solvedWithSingleSubCount[0]]}
                data2={[solvedWithSingleSubCount[1]]}
                title={`Solved with single submission count of ${cfHandle1} & ${cfHandle2}`}
                cfHandle1={cfHandle1}
                cfHandle2={cfHandle2}
              />
            </Item>
          </Grid>
          <Grid item xs sm md lg xl>
            <Item elevation={24}>
              <MultiBarChart
                labels={["Tried", "Accepted"]}
                data1={[
                  commonProblemsTriedAcceptedCount[0],
                  commonProblemsTriedAcceptedCount[1],
                ]}
                data2={[
                  commonProblemsTriedAcceptedCount[2],
                  commonProblemsTriedAcceptedCount[3],
                ]}
                title={`Common problems tried vs solved by both ${cfHandle1} & ${cfHandle2}`}
                cfHandle1={cfHandle1}
                cfHandle2={cfHandle2}
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Item sx={{ height: "350px", overflow: "auto" }} elevation={24}>
        <MultiBarChart
          labels={Array.from(tagListCount.keys())}
          data1={Array.from(tagListCount.values()).reduce((res, { user1 }) => {
            res.push(user1);
            return res;
          }, [])}
          data2={Array.from(tagListCount.values()).reduce((res, { user2 }) => {
            res.push(user2);
            return res;
          }, [])}
          title={`Tags of ${cfHandle1} & ${cfHandle2}`}
          cfHandle1={cfHandle1}
          cfHandle2={cfHandle2}
        />
      </Item>

      <Item sx={{ height: "350px" }} elevation={24}>
        <MultiBarChart
          labels={Array.from(levelListCount.keys())}
          data1={Array.from(levelListCount.values()).reduce(
            (res, { user1 }) => {
              res.push(user1);
              return res;
            },
            []
          )}
          data2={Array.from(levelListCount.values()).reduce(
            (res, { user2 }) => {
              res.push(user2);
              return res;
            },
            []
          )}
          title={`Levels of ${cfHandle1} & ${cfHandle2}`}
          cfHandle1={cfHandle1}
          cfHandle2={cfHandle2}
        />
      </Item>
      <Item sx={{ height: "350px" }} elevation={24}>
        <MultiBarChart
          labels={Array.from(ratingListCount.keys())}
          data1={Array.from(ratingListCount.values()).reduce(
            (res, { user1 }) => {
              res.push(user1);
              return res;
            },
            []
          )}
          data2={Array.from(ratingListCount.values()).reduce(
            (res, { user2 }) => {
              res.push(user2);
              return res;
            },
            []
          )}
          title={`Ratings of ${cfHandle1} & ${cfHandle2}`}
          cfHandle1={cfHandle1}
          cfHandle2={cfHandle2}
        />
      </Item>

      {/* return <Bar data={data} options={options}/>; */}
    </React.Fragment>
  );
};

export default MultiChartCompare;

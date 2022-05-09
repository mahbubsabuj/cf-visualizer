import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@emotion/react";
import toast, { Toaster } from "react-hot-toast";
import InputField from "./InputField";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import fetchUserSubmissions from "../apis/fetchUserSubmissions";
import fetchUserContests from "../apis/fetchUserContests";
import MultiChartCompare from "./MultiChartCompare";
import { getContestDetails } from "../utils/dataPrepare";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
}));

const ComparePage = () => {
  const theme = useTheme();
  const [handle1, setHandle1] = useState("");
  const [handle2, setHandle2] = useState("");
  const [submissionDetails1, setSubmissionDetails1] = useState([]);
  const [submissionDetails2, setSubmissionDetails2] = useState([]);
  const [contestDetails1, setContestDetails1] = useState({});
  const [contestDetails2, setContestDetails2] = useState({});
  const handleSubmit = async () => {
    setSubmissionDetails1([]);
    setSubmissionDetails2([]);
    if (handle1 && handle2) {
      const toastId = toast.loading("Fetching ...", {
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      if (handle1.toLowerCase() === handle2.toLowerCase()) {
        toast.error("Handles should be distinct!", { id: toastId });
      } else {
        const response = await fetchUserSubmissions(handle1).catch((e) => {
          return false;
        });
        const response2 = await fetchUserSubmissions(handle2).catch((e) => {
          return false;
        });
        if (!response || !response2) {
          toast.error(
            "Could not be fetched! Please recheck spallings of both handle & check your internet connection!",
            {
              id: toastId,
            }
          );
        } else if (
          response.data.result.length !== 0 &&
          response2.data.result !== 0
        ) {
          toast.success("Finished!", {
            id: toastId,
          });
          //prepare the data
          const results = response.data.result.map((submission) => {
            return {
              contestId: submission.problem.contestId,
              index: submission.problem.index,
              rating: submission.problem.rating,
              tags: submission.problem.tags,
              verdict: submission.verdict,
              language: submission.programmingLanguage,
            };
          });
          const results2 = response2.data.result.map((submission) => {
            return {
              contestId: submission.problem.contestId,
              index: submission.problem.index,
              rating: submission.problem.rating,
              tags: submission.problem.tags,
              verdict: submission.verdict,
              language: submission.programmingLanguage,
            };
          });
          setSubmissionDetails1(results);
          setSubmissionDetails2(results2);
          //getting contest informations
          const contestDetailsUser1 = await fetchUserContests(handle1).catch(
            (e) => false
          );
          const contestDetailsUser2 = await fetchUserContests(handle2).catch(
            (e) => false
          );
          if (contestDetailsUser1 && contestDetailsUser2) {
            //number of rated contests
            //numnber of solves
            //best rank + best rank contest
            //worst rank + worst rank contest
            //max up + max up contest
            //max down  + max down contest
            //current rating (if doenst have any then set it to 0)
            setContestDetails1(getContestDetails(contestDetailsUser1, theme.palette.text.primary));
            setContestDetails2(getContestDetails(contestDetailsUser2, theme.palette.text.primary));
          }
        } else {
          toast.error("Users should have atleast 1 submission.", {
            id: toastId,
          });
        }
      }
    } else {
      toast.error("Please Enter both handles!", {
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "100%",
        },
      }}
      onSubmit={handleSubmit}
    >
      <Toaster />
      <Box component="form">
        <Grid
          container
          columnSpacing={{ xs: 1, sm: 3, md: 4 }}
          sx={{ pl: 5.5, pr: 5.5 }}
        >
          <Grid item xs sm md lg xl>
            <Item elevation={24}>
              <InputField handleChange={setHandle1} placeholder={"Handle 1"} />
            </Item>
          </Grid>
          <Grid item xs sm md lg xl>
            <Item elevation={24}>
              <InputField handleChange={setHandle2} placeholder={"Handle 2"} />
            </Item>
          </Grid>
        </Grid>
        <Box height="10px" />
        <Box textAlign="center">
          <Button
            style={{
              backgroundColor: theme.palette.buttonColor,

              fontSize: "18px",
              color: theme.palette.text.primary,
            }}
            variant="contained"
            startIcon={<CompareArrowsIcon />}
            onClick={handleSubmit}
          >
            Compare
          </Button>
        </Box>
      </Box>
      {submissionDetails1.length !== 0 &&
        submissionDetails2.length !== 0 &&
        Object.keys(contestDetails1).length !== 0 &&
        Object.keys(contestDetails2).length !== 0 && (
          <MultiChartCompare
            cfHandle1={handle1}
            cfHandle2={handle2}
            submissionDetails1={submissionDetails1}
            submissionDetails2={submissionDetails2}
            contestDetails1={contestDetails1}
            contestDetails2={contestDetails2}
          />
        )}
    </Box>
  );
};

export default ComparePage;

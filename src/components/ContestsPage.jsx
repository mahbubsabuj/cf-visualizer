import React, { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import { Badge, Divider, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import fetchContestInfo from "../apis/kontest/fetchContestInfo";
import ContestTable from "./ContestTable";
import toast, { Toaster } from "react-hot-toast";
import { Paper } from "@mui/material";
import { Grid } from "@mui/material";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: -4,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const buttons = [
  "All",
  "CodeForces",
  "CodeForces::Gym",
  "TopCoder",
  "AtCoder",
  "CS Academy",
  "CodeChef",
  "HackerRank",
  "HackerEarth",
  "Kick Start",
  "LeetCode",
  "Toph",
];

const getContestCount = (present, future, hostedBy) => {
  const presentCount = Object.values(present).reduce((res, { site }) => {
    if (site === hostedBy) ++res;
    return res;
  }, 0);
  const futureCount = Object.values(future).reduce((res, { site }) => {
    if (site === hostedBy) ++res;
    return res;
  }, 0);
  return presentCount + futureCount;
};

const emptyObject = (keys) => {
  let res = {};
  keys.forEach((key) => {
    res[key] = 0;
  });
  return res;
};

const contestCount = (present, future) => {
  let res = { [buttons[0]]: future.length + present.length };
  buttons.forEach((site) => {
    if (site !== "All") {
      const count = getContestCount(present, future, site);
      res[site] = count;
    }
  });
  return res;
};

const ContestsPage = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [siteContestCount, setSiteContestCount] = useState(
    emptyObject(buttons)
  );
  const [runningContests, setRunningContests] = useState([]);
  const [futureContests, setFutureContests] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const fetchContests = async () => {
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
    const response = await fetchContestInfo().catch((error) => false);
    if (!response) {
      toast.error("Please check your internet connection!", {
        id: toastId,
      });
    } else {
      toast.success("Finished!", {
        id: toastId,
      });
      const future = Object.values(response).reduce((res, contest) => {
        if (contest.status === "BEFORE") {
          res.push(contest);
        }
        return res;
      }, []);
      const running = Object.values(response).reduce((res, contest) => {
        if (contest.status !== "BEFORE") {
          res.push(contest);
        }
        return res;
      }, []);
      const now = new Date();
      setRunningContests(running);
      setFutureContests(future);
      setSiteContestCount(contestCount(running, future));

      localStorage.setItem(
        "contests",
        JSON.stringify({
          date: now,
          running: running,
          future: future,
        })
      );
    }
  };
  useEffect(() => {
    //check if local storage has the data or not
    //if local storage has the data then when it was fetched ? if the time differece is < 5 mintues then don't call the api
    //other wise call the api
    const saved = JSON.parse(localStorage.getItem("contests"));
    if (saved) {
      const prev = Date.parse(saved.date);
      const now = Date.parse(new Date());
      if ((now - prev) / 1000 <= 300) {
        const running = saved.running;
        const future = saved.future;
        setRunningContests(running);
        setFutureContests(future);
        setSiteContestCount(contestCount(running, future));
      } else {
        fetchContests();
      }
    } else {
      fetchContests();
    }
  }, []);
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Toaster />
      <Box height="10px"></Box>
      <Box
        width="90%"
        evaluation={24}
        sx={{
          maxWidth: {
            xs: 420,
            sm: 580,
            backgroundColor: theme.palette.action.disabledBackground,
          },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="scrollable auto tabs example"
        >
          {buttons.map((button, index) => {
            return (
              <Tab
                key={index}
                label={
                  <StyledBadge
                    value={index}
                    badgeContent={siteContestCount[button]}
                    color="success"
                  >
                    <Typography
                      fontSize={14}
                      fontWeight="bold"
                      color={theme.palette.text.primary}
                    >
                      {button}
                    </Typography>
                  </StyledBadge>
                }
              />
            );
          })}
        </Tabs>
      </Box>

      <Box height="20px" />
      <Box
        width="90%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Grid container columnSpacing={{ xs: 5, sm: 2, md: 2 }}>
          <Grid item xs sm md lg xl>
            {futureContests.length !== 0 && (
              <ContestTable
                contests={futureContests}
                site={buttons[value]}
                tableTitle="Future Contest"
              />
            )}
          </Grid>
          <Grid item xs sm md lg xl>
            {runningContests.length !== 0 && (
              <ContestTable
                contests={runningContests}
                site={buttons[value]}
                tableTitle="Running Contest"
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ContestsPage;

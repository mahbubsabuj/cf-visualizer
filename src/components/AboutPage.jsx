import React from "react";
import { Box } from "@mui/system";
import { Paper } from "@mui/material";
import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import { Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AboutPage = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="90%">
      <Box height="30px" />
      <Typography fontWeight={"bold"}>
        Hi 👋, I'm Mahbubul Alam Sabuj
      </Typography>
      <Divider variant="middle" style={{ width: "90%" }} />
      <Divider variant="middle" style={{ width: "90%" }} />
      <Divider variant="middle" style={{ width: "90%" }} />
      <Divider variant="middle" style={{ width: "90%" }} />
    </Box>
  );
};

export default AboutPage;

import React from "react";
import { Stack } from "@mui/material";
import { LinearProgress } from "@mui/material";

const Loader = () => {
  return (
    <Stack sx={{ width: "100%", color: "grey.500" }} spacing={20}>
      <LinearProgress color="inherit" />
    </Stack>
  );
};

export default Loader;

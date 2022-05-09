import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import { TextField } from "@mui/material";

const InputField = ({ handleChange, placeholder }) => {
  const theme = useTheme();
  const color = theme.palette.text.primary;
  const [cfHandle, setCfHandle] = useState("");
  const handleInputChange = (event) => {
    setCfHandle(event.target.value);
    handleChange(event.target.value);
  };
  return (
    <TextField
      id="filled-search"
      type="search"
      variant="filled"
      placeholder={placeholder}
      sx={{ color: "black", borderColor: "black" }}
      inputProps={{
        style: {
          color: color,
          backgroundColor: theme.palette.backgroundColor,
        },
      }}
      focused
      value={cfHandle}
      onChange={handleInputChange}
    />
  );
};

export default InputField;

import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@emotion/react";
import { TextField } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
}));

const SearchBar = ({ onTermSubmit }) => {
  const theme = useTheme();
  const [term, setTerm] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("cfHandle", JSON.stringify(term));
    onTermSubmit(term);
  };
  const handleInputChange = (event) => {
    setTerm(event.target.value);
  };
  useEffect(() => {
    const saved = localStorage.getItem("cfHandle");
    const initialValue = JSON.parse(saved);
    if (initialValue) {
      setTerm(initialValue);
    }
  }, []);
  return (
    <Item elevation={24}>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          id="filled-search"
          type="search"
          variant="filled"
          placeholder="Enter your CF Handle"
          inputProps={{ style: { color: theme.palette.text.primary, backgroundColor: theme.palette.backgroundColor } }}
          focused
          value={term}
          onChange={handleInputChange}
        />
      </Box>
    </Item>
  );
};

export default SearchBar;

import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CssBaseline, ScopedCssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ComparePage from "./components/ComparePage";
import ContestsPage from "./components/ContestsPage";
import MainAppBar from "./components/MainAppBar";
const light = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    mode: "light",
    buttonColor: "#FFFFFF",
    appBarColor: "#009C41",
  },
});

const dark = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    mode: "dark",
    buttonColor: "#272727",
    appBarColor: "#000000",
  },
});

const App = () => {
  const [theme, setTheme] = useState("dark");
  // useEffect(() => {
  //   const saved = localStorage.getItem("theme");
  //   const initialTheme = JSON.parse(saved);
  //   if (initialTheme) {
  //     console.log(initialTheme)
  //     setTheme(initialTheme);
  //   }
  // }, []);
  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <ScopedCssBaseline enableColorScheme>
        <CssBaseline />
        <Box>
          <Box sx={{ p: 1 }}>
            <MainAppBar changeTheme={setTheme} />
          </Box>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contests" element={<ContestsPage />} />
            <Route path="/compare" element={<ComparePage />} />
            {/* <Route path="/about" element={<AboutPage />} /> */}
          </Routes>
        </Box>
      </ScopedCssBaseline>
    </ThemeProvider>
  );
};
export default App;

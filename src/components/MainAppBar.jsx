import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { Button } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import PsychologyIcon from "@mui/icons-material/Psychology";
import DifferenceIcon from "@mui/icons-material/Difference";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";

//theming
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const pages = ["Home", "Contests", "Compare"];
const routes = ["/", "/contests", "/compare"];
const menuIcons = [
  <HomeIcon fontSize="large" sx={{ p: 1 }} />,
  <PsychologyIcon fontSize="large" sx={{ p: 1 }} />,
  <DifferenceIcon fontSize="large" sx={{ p: 1 }} />,
  <InfoIcon fontSize="large" sx={{ p: 1 }} />,
];

const MainAppBar = ({ changeTheme }) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [theme, setTheme] = useState("dark");
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleThemeChange = (event) => {
    // localStorage.setItem("theme", JSON.stringify(theme === "light" ? "dark" : "light"));
    changeTheme(theme === "light" ? "dark" : "light");
    setTheme((prevState) => (prevState === "light" ? "dark" : "light"));
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {pages.map((page, index) => (
        <MenuItem
          style={{ textDecoration: "none" }}
          component={Link}
          to={routes[index]}
          key={page}
          value={index}
          onClick={handleMobileMenuClose}
        >
          {menuIcons[index]}
          <Typography textAlign="center">{page}</Typography>
        </MenuItem>
      ))}
      <MenuItem style={{ textDecoration: "none" }} onClick={handleThemeChange}>
        {theme === "light" ? (
          <Brightness7Icon fontSize="large" sx={{ p: 1 }} />
        ) : (
          <Brightness4Icon fontSize="large" sx={{ p: 1 }} />
        )}
        <Typography textAlign="center">
          {theme === "light" ? "Dark" : "Light"}
        </Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: useTheme().palette.appBarColor }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <Button component={Link} to="/">
            <SvgIcon fontSize="large">
              <path
                fill="#F44336"
                d="M24,19.5V12c0-0.828-0.672-1.5-1.5-1.5h-3c-0.828,0-1.5,0.672-1.5,1.5v7.5c0,0.828,0.672,1.5,1.5,1.5h3C23.328,21,24,20.328,24,19.5z"
              />
              <path
                fill="#2196F3"
                d="M13.5,21c0.828,0,1.5-0.672,1.5-1.5v-15C15,3.672,14.328,3,13.5,3h-3C9.673,3,9,3.672,9,4.5v15c0,0.828,0.673,1.5,1.5,1.5H13.5z"
              />
              <path
                fill="#FFC107"
                d="M0,19.5C0,20.328,0.673,21,1.5,21h3C5.328,21,6,20.328,6,19.5V9c0-0.828-0.672-1.5-1.5-1.5h-3C0.673,7.5,0,8.172,0,9V19.5z"
              />
            </SvgIcon>
          </Button>
          <Typography variant="h6" noWrap component="div">
            Codeforces Visualizer
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <MenuItem
                style={{ textDecoration: "none" }}
                component={Link}
                to={routes[index]}
                key={page}
                value={index}
              >
                {menuIcons[index]}
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
            <MenuItem
              style={{ textDecoration: "none" }}
              onClick={handleThemeChange}
            >
              {theme === "light" ? (
                <Brightness7Icon fontSize="large" sx={{ p: 1 }} />
              ) : (
                <Brightness4Icon fontSize="large" sx={{ p: 1 }} />
              )}
              <Typography textAlign="center">
                {theme === "light" ? "Dark" : "Light"}
              </Typography>
            </MenuItem>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
        {renderMobileMenu}
      </Container>
    </AppBar>
  );
};

export default MainAppBar;

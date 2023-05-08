import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { DarkLogo, Menu } from "../../../assets/SVG";
import { Button, IconButton, styled } from "@mui/material";
import { NavBarProps } from "./types";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../../Dropdown";

const MenuItem = styled(Button)(({ theme }) => ({
  font: theme.font.sm,
  color: theme.palette.secondary[700],
  textTransform: "none",
  transition: "0.3s",
  "&:hover": {
    color: theme.palette.primary[700],
  },
}));

const NavigationContainer = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "1400px",
  "#burguer-menu": {
    display: "none",
    cursor: "pointer",
  },
  [theme.breakpoints.down("md")]: {
    "#burguer-menu": {
      display: "inline-flex",
    },
    "& > div": {
      display: "none",
    },
  },
}));

export default function NavBar({ logged }: NavBarProps) {
  const navigate = useNavigate();
  const [navigationBurguer, setNavigationBurguer] =
    useState<null | HTMLElement>(null);

  const navigationOptions = [
    {
      label: "Entrar",
      handler: () => navigate("/login"),
    },
    {
      label: "Registrar",
      handler: () => navigate("/register"),
    },
    {
      label: "Explorar",
      handler: () => navigate("/home"),
    },
  ];

  return (
    <AppBar
      elevation={1}
      position="sticky"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: "20px",
        minHeight: "80px",
      }}
    >
      <NavigationContainer disableGutters>
        <Link to="/">
          <DarkLogo />
        </Link>
        <Box display={"flex"} columnGap={3}>
          <MenuItem>Explorar</MenuItem>
          {!logged ? (
            <>
              <MenuItem onClick={() => navigate("/login")}>Entrar</MenuItem>
              <Button
                variant="outlined"
                sx={{
                  font: (t) => t.font.sm,
                  textTransform: "none",
                }}
                onClick={() => navigate("/register")}
              >
                Registre-se
              </Button>
            </>
          ) : null}
        </Box>
        <IconButton
          id="burguer-menu"
          onClick={({ currentTarget }) => setNavigationBurguer(currentTarget)}
        >
          <Menu />
        </IconButton>
        <Dropdown
          open={!!navigationBurguer}
          anchorEl={navigationBurguer}
          options={navigationOptions}
          handleClose={() => setNavigationBurguer(null)}
        />
      </NavigationContainer>
    </AppBar>
  );
}

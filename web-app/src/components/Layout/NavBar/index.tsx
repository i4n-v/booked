import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { DarkLogo } from "../../../assets/SVG";
import { Button } from "@mui/material";
import { NavBarProps } from "./types";
import { Link } from "react-router-dom";
export default function NavBar({ logged }: NavBarProps) {
  return (
    <AppBar elevation={1} position="sticky">
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 5%",
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="secondary"
          aria-label="menu"
          sx={{ mr: 2 }}
          disableRipple
          href="/"
        >
          <DarkLogo />
        </IconButton>
        <Box display={"flex"} columnGap={3}>
          <Button
            sx={{
              font: (t) => t.font.xs,
              color: (t) => t.palette.secondary.main,
            }}
          >
            Explorar
          </Button>
          {!logged ? (
            <>
              <Button
                sx={{
                  font: (t) => t.font.xs,
                  color: (t) => t.palette.secondary.main,
                }}
              >
                Entrar
              </Button>
              <Link to={"/register"}>
                <Button variant="outlined" sx={{ font: (t) => t.font.xs }}>
                  Registre-se
                </Button>
              </Link>
            </>
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

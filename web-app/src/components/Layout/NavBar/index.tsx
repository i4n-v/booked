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
              color: (t) => t.palette.secondary[800],
              textTransform: 'none',
              marginRight: '40px'
            }}
          >
            Explorar
          </Button>
          {!logged ? (
            <>
              <Link to={"/login"}>
                <Button
                  sx={{
                    font: (t) => t.font.xs,
                    color: (t) => t.palette.secondary[800],
                    textTransform: 'none',
                    marginRight: '40px'
                  }}
                >
                  Entrar
                </Button>
              </Link>
              <Link to={"/register"}>
                <Button variant="outlined"
                  sx={{
                    font: (t) => t.font.xs,
                    textTransform: 'none',
                    marginRight: '40px'
                  }}>
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

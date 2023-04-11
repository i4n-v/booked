import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { DarkLogo } from "../../../assets/SVG";
import { Button } from "@mui/material";
import { NavBarProps } from "./types";
export default function NavBar({ logged }: NavBarProps) {
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          size="large"
          edge="start"
          color="secondary"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <DarkLogo />
        </IconButton>
        <Box>
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
              <Button variant="outlined" 
                sx={{ 
                  font: (t) => t.font.xs,
                  textTransform: 'none',
                  marginRight: '40px'
                  }}>
                Registre-se
              </Button>
            </>
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

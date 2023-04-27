import { AppBar, Toolbar, Typography, Stack, Button } from "@mui/material"

export default function Menu() {

  return (
    <div>
      <AppBar position="fixed" sx={{ backgroundColor: (t) => t.palette.secondary[50] }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src="/logo-dark.svg" alt="logo" />
          </Typography>
          <Stack direction="row" spacing={5}
            color={(t) => t.palette.secondary.main}>
            <Button color="inherit" sx={{ font: (t) => t.font.xs, color: (t) => t.palette.secondary.main }}>
              Explorar
            </Button>
            <Button sx={{ font: (t) => t.font.xs, color: (t) => t.palette.secondary.main }}>
              Entrar
            </Button>
            <Button variant="outlined" sx={{ font: (t) => t.font.xs }}>
              Registre-se
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
}
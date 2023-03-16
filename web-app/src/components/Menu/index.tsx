import { AppBar, Toolbar, Typography, Stack, Button, ThemeProvider, createTheme } from "@mui/material"

export default function Menu() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#FFFFFF',
      },
      secondary: {
        main: '#9b51e0',
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
              <img src="/logo-dark.svg" alt="logo" />
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button color="inherit" >Explorar</Button>
              <Button color="inherit">Entrar</Button>
              <Button color="inherit">Registre-se</Button>
            </Stack>
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}
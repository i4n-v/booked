import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function Layout() {
  return (
    <Box >
      <NavBar />
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          minHeight: "86vh",
          backgroundColor: (t) => t.palette.secondary[100],
          padding: 0,
        }}
      >
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}

import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Layout() {
  const [authData] = useContext(AuthContext);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavBar logged={!!authData?.valid} />
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          backgroundColor: (t) => t.palette.secondary[100],
          padding: 0,
          flex: 1,
        }}
      >
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}

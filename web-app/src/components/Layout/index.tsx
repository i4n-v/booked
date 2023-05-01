import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Layout() {

  const [authData] = useContext(AuthContext)
  return (
    <Box >
      <NavBar logged={!!authData?.userData} />
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

import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { BookBackground } from "../../assets/SVG";

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
        <Suspense fallback={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <BookBackground />
          </div>}>
          <Outlet />
        </Suspense>
      </Container>
      <Footer />
    </Box>
  );
}

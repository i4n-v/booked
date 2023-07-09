import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Loading from "../../helpers/Loading";

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
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </Container>
      <Footer />
    </Box>
  );
}

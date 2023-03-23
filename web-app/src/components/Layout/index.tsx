import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function Layout(){
    return (
        <>
        <NavBar />
        <Container sx={{minHeight: '86vh'}}>
            <Outlet/>
        </Container>
        <Footer />
        </>
    )
}
import { Box, ListItemButton, ListItemText, styled } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateRows: "20% 1fr",
    padding: '60px 20px 120px 20px',
    maxWidth: "1400px",
    width: '100%',
    margin: '0 auto',
    "& > h1": {
        font: theme.font.xl,
        color: theme.palette.secondary.A200,
        marginBottom: "60px",
        alignSelf: "center"
    },
}));


const ConfigContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    background: theme.palette.secondary['light'],
    display: "grid",
    overflow: "hidden",
    gridTemplateColumns: "320px 1fr",
    [theme.breakpoints?.down("md")]: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto",
        gridAutoRows: "1fr"

    },

}));

const ConfigMenu = styled(Box)(({ theme }) => ({
    width: "100%",
    background: theme.palette.secondary['main'],
    [theme.breakpoints?.down("md")]: {
        height: "fit-content",
    },
}));

const ConfigContent = styled(Box)(({ theme }) => ({
    width: "100%",
    padding: "60px",
    maxWidth: "860px",
    margin: '0 auto'
}));


export {
    Container,
    ConfigContainer,
    ConfigMenu,
    ConfigContent
}
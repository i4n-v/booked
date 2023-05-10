import { Box, ListItemButton, ListItemText, styled } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateRows: "20% 1fr",
    height: "100vh",
    padding: "3%",
    maxWidth: "100%",
    [theme.breakpoints?.down("md")]: {
        padding: '3px',
    },
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
    gridTemplateColumns: "20% 1fr",
    [theme.breakpoints?.down("md")]: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "15%",
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
    padding: "4%",
    paddingLeft: "7%"
}));


export {
    Container,
    ConfigContainer,
    ConfigMenu,
    ConfigContent
}
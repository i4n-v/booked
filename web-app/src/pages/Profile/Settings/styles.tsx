import { Box, styled } from "@mui/material";
import { InputAreaItemProps, InputAreaProps } from "./types";

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
    [theme.breakpoints?.down("md")]: {
        padding: '60px 5px 120px 5px',
    },
}));

const InputArea = styled(Box)<InputAreaProps>(({ theme, cols }) => ({
    display: 'grid',
    width: '100%',
    minHeight: '100%',
    gridTemplateColumns: `repeat(${cols},1fr)`,
    gridAutoRows: "minmax(min-content, max-content);",
    [theme.breakpoints?.down("md")]: {
        gridTemplateColumns: "1fr",
    },
}));

const InputAreaItem = styled(Box)<InputAreaItemProps>(({ theme, span = 1 }) => ({
    width: '100%',
    gridColumn: `auto / span ${span}`,
    [theme.breakpoints?.down("md")]: {
        gridColumn: `auto / span 1`,
    },
}));

const ContentContainer = styled('form')(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: "grid",
    minHeight: '600px',
    rowGap: "40px"
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
    ConfigContent,
    InputAreaItem,
    InputArea,
    ContentContainer
}
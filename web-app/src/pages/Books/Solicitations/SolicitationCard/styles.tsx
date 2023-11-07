import { Box, styled } from "@mui/material";

export const SolicitationCardContainer = styled(Box)(({ theme }) => ({
    minHeight: "136px",
    minWidth: "1040px",
    backgroundBlendMode: "hard-light",
    backgroundColor: theme.palette.secondary.light,
    position: "relative",
    overflow: "hidden",
    "::before": {
        content: '""',
        position: "absolute",
        top: "-25%",
        left: "-2%",
        // transform: "translate(-50%,-50%)",
        width: "120px",
        height: "120px",
        backgroundColor: "red",
        borderRadius: "30%"
    }
}));

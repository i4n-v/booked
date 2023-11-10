import { Box, styled } from "@mui/material";

export const SolicitationCardContainer = styled(Box)(({ theme }) => ({
    minHeight: "136px",
    minWidth: "1040px",
    display: "grid",
    gridTemplateColumns: "120px 1fr",
    backgroundColor: theme.palette.secondary.light,
    position: "relative",
    overflow: "hidden",
}));

export const SolicitationCardBadge = styled(Box)(({ theme, bgcolor }) => ({
    transform: "translate(-40%,-50%)",
    width: "180px",
    height: "180px",
    backgroundColor: `${bgcolor}`,
    borderRadius: "48%",
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    "& > svg": {
        color: "white",
        transform: "translate(-130%,120%)",
        fontSize: "2rem"
    }
}));

export const SolicitationCardInfo = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    "& > span": {
        font: theme.font.md,
        "& > span": {
            marginLeft: "10px",
            font: theme.font.md,
            color: theme.palette.secondary[800]
        }
    },
    "& span:first-of-type": {
        paddingBottom: "12px"
    }
}));
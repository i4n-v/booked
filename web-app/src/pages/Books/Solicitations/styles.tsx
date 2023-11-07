import { Box, styled } from "@mui/material";

export const SolicitationsContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
}));

export const SolicitationsTypes = styled(Box)(({ theme }) => ({
    display: "flex",
    columnGap: "20px",
    position: "absolute",
    right: 0
}));


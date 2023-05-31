import { Box, styled } from "@mui/material";

export const DialogContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.light,
    padding: '40px'
}));
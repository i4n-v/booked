import { Box, styled } from "@mui/material";
import { iBookedDialogContainer } from "./types";

export const DialogContainer = styled(Box)<iBookedDialogContainer>(({ theme, width, height }) => ({
    width,
    height,
    backgroundColor: theme.palette.secondary.light,
    padding: '40px'
}));
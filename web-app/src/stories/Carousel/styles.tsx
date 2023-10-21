import { Box, styled } from "@mui/material";

export const CarouselItemContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.A200,
  padding: "200px",
  boxShadow: theme.shadows[1],
  borderRadius: 6,
  "& > span": {
    color: theme.palette.secondary.light,
    font: theme.font.lg,
  },
}));

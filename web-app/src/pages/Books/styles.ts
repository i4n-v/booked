import { Box, styled } from "@mui/material";

export const BooksActions = styled(Box)(({ theme }) => ({
  minHeight: "56px",
  display: "flex",
  justifyContent: "space-between",
}));

export const BooksCardsContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  columnGap: "80px",
  paddingTop: "40px",
  rowGap: "40px",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    columnGap: "40px",
    rowGap: "30px",
  },
}));

export const BooksContainer = styled(Box)(({ theme }) => ({
  minHeight: "960px",
  display: "flex",
  flexDirection: "column",
}));

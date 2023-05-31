import { Box, styled } from "@mui/material";

export const BooksActions = styled(Box)(({ theme }) => ({
  minHeight: "56px",
  display: "flex",
  justifyContent: "space-between",
}));

export const BooksCardsContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, min-content)",
  columnGap: "80px",
  paddingTop: "40px",
  justifyContent: "space-evelyn",
  rowGap: "40px",
  [theme.breakpoints.down("lg")]: {
    display: "grid",
    gridTemplateColumns: "repeat(3, min-content)",
    justifyContent: "center",
  },
  [theme.breakpoints.down("md")]: {
    display: "grid",
    gridTemplateColumns: "repeat(2, min-content)",
    justifyContent: "center",
  },
  [theme.breakpoints.down("sm")]: {
    display: "grid",
    gridTemplateColumns: "repeat(1, min-content)",
    justifyContent: "center",
  },
}));

export const BooksContainer = styled(Box)(({ theme }) => ({
  minHeight: "960px",
  display: "flex",
  flexDirection: "column",
}));

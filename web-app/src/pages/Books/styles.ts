import { Box, styled } from "@mui/material";

export const Actions = styled(Box)<{ showfilters: boolean }>(({ theme, showfilters }) => ({
  "& > div:first-of-type": {
    display: "flex",
    justifyContent: "space-between",
  },
  "& form:first-of-type": {
    display: "grid",
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '20px',
    visibility: showfilters ? "visible" : "hidden",
    opacity: showfilters ? 1 : 0,
    height: showfilters ? "auto" : 0,
    transition: "opacity 1s linear",
  },
  minHeight: "56px",
  display: 'grid',
  rowGap: '28px',
}));

export const BooksCardsContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, min-content)",
  columnGap: "80px",
  paddingTop: "40px",
  justifyContent: "space-evelyn",
  rowGap: "40px",
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(3, min-content)",
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, min-content)",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(1, min-content)",
  },
}));

export const BooksContainer = styled(Box)(({ theme }) => ({
  minHeight: "960px",
  display: "flex",
  flexDirection: "column",
}));

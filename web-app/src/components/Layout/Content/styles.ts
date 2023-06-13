import { Box, styled } from "@mui/material";

const Content = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateRows: "74px 1fr",
  padding: "60px 20px 120px 20px",
  maxWidth: "1400px",
  width: "100%",
  rowGap: "40px",
  margin: "0 auto",
  "& > h1": {
    font: theme.font.xl,
    color: theme.palette.secondary.A200,
    alignSelf: "center",
  },
  [theme.breakpoints?.down("md")]: {
    padding: "60px 5px 120px 5px",
  },
}));

export default Content;

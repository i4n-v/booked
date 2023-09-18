import { Box, Paper, styled } from "@mui/material";
import Content from "../../components/Layout/Content/styles";

const ContainerChat = styled(Content)(({ theme }) => ({
  display: "grid",
  maxWidth: "1536px",
  gridTemplateRows: "80px 1fr",
  rowGap: "0px",
  padding: "0px 0px 120px 20px",
  [theme.breakpoints?.down("md")]: {
    // gridTemplateRows: "400px 1fr",
  },
}));
const BarChat = styled(Paper)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.secondary.light,
  display: "flex",
  alignItems: "center",
  font: theme.font.sm,
}));

const ContentChat = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "grid",
  gridTemplateColumns: '40% 60%',
  gridTemplateRows: "72vh",
}));

export {
  BarChat,
  ContainerChat,
  ContentChat,
};

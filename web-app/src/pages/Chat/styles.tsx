import { Box, Paper, styled } from "@mui/material";
import Content from "../../components/Layout/Content/styles";

const ContainerChat = styled(Content)(({ theme }) => ({
  display: "grid",
  maxWidth: "100%",
  width: "100%",
  gridTemplateRows: "80px 1fr",
  rowGap: "0px",
  padding: "0px",
  [theme.breakpoints?.down("md")]: {
    padding: "0px",
    gridTemplateRows: "80px 1fr",
  },
}));
const BarChat = styled(Paper)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.secondary.light,
  display: "flex",
  alignItems: "center",
  font: theme.font.sm,
  columnGap: "40px"
}));

const ContentChat = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "grid",
  gridTemplateColumns: '40% 60%',
  gridTemplateRows: "minmax(auto, 75vh)",
}));

export {
  BarChat,
  ContainerChat,
  ContentChat,
};

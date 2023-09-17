import { Box, Paper, styled } from "@mui/material";
import Content from "../../components/Layout/Content/styles";

const ContainerChat = styled(Content)(({ theme }) => ({
  display: "grid",
  maxWidth: "1536px",
  gridTemplateRows: "80px 1fr",
  rowGap: "0px",
  padding: "0px 0px 120px 20px",
  [theme.breakpoints?.down("md")]: {
    gridTemplateRows: "400px 1fr",
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
  display: "flex",
  overflow: "hidden",
  height: "72vh",
  columnGap: "22px",
}));

const ChatListContainer = styled(Paper)(({ theme }) => ({
  flex: 4,
  height: "100%",
  backgroundColor: theme.palette.secondary[100],
}));

const ChatMessagesContainer = styled(Box)(({ theme }) => ({
  flex: 6,
  display: "flex",
  flexDirection: "column-reverse",
  rowGap: "20px",
}));

const ChatMessages = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column-reverse",
  gap: "12px",
  overflow: "auto",
}));

const SendMessage = styled(Box)(({ theme }) => ({
  "& > form": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    columnGap: "20px",
  },
}));

const SearchChat = styled(Box)(({ theme }) => ({
  height: "104px",
  display: "flex",
  alignItems: "center",
  paddingLeft: "68px",
  paddingRight: "20px",
  width: "100%",
  "& > form": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    columnGap: "20px",
  },
}));

const ChatList = styled(Box)(({ theme }) => ({
  overflow: "auto",
  maxHeight: "calc(100% - 104px)",
}));

export {
  BarChat,
  ContainerChat,
  ContentChat,
  ChatMessagesContainer,
  ChatListContainer,
  SearchChat,
  ChatList,
  SendMessage,
  ChatMessages,
};

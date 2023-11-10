import { Box, styled } from "@mui/material";

const ChatMessagesContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  maxWidth: "100%",
  flexDirection: "column-reverse",
  rowGap: "20px",
  height: "100%",
  paddingtop: "30px",
  paddingBottom: "10px",
  paddingRight: "22px",
}));

const ChatMessages = styled(Box)(({ theme }) => ({
  display: "flex",
  maxWidth: "100%",
  width: "100%",
  flexDirection: "column-reverse",
  gap: "12px",
  overflow: "auto",
  paddingLeft: "22px",
  paddingRight: "22px",
}));

const NewMessage = styled(Box)(({ theme }) => ({
  "& > form": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    columnGap: "20px",
  },
}));

export { ChatMessages, ChatMessagesContainer, NewMessage };

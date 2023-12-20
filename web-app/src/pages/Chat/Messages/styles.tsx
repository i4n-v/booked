import { Box, styled } from "@mui/material";

const ChatMessagesContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  maxWidth: "100%",
  flexDirection: "column-reverse",
  rowGap: "20px",
  height: "100%",
  // paddingtop: "30px",
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
  paddingTop: "10px",
  paddingRight: "22px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: 0 /* Set the width of the scrollbar to 0 */
  }
}));

const NewMessage = styled(Box)(({ theme }) => ({
  "& > form": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    columnGap: "20px",
  },
}));

const SeeMore = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  color: theme.palette.primary.main,
  minHeight: "100px",
  cursor: "pointer",
  borderRadius: "5px",
  "&:hover": {
    background: `linear-gradient(180deg, ${theme.palette.secondary[100]} 30%, ${theme.palette.secondary[400]} 100%)`
  }
}));

export { ChatMessages, ChatMessagesContainer, NewMessage, SeeMore };

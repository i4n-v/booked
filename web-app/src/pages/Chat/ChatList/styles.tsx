import { Box, Paper, styled } from "@mui/material";

const ChatListContainer = styled(Paper)(({ theme }) => ({
    height: "100%",
    backgroundColor: theme.palette.secondary[100],
  }));

  const ChatListBox = styled(Box)(({ theme }) => ({
    overflow: "auto",
    maxHeight: "calc(100% - 104px)",
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

  export {
    ChatListBox,
    ChatListContainer,
    SearchChat
  }


import { Box, Button, Typography } from "@mui/material";
import { AccountCircle, Send } from "@mui/icons-material";
import { BarChat, ContainerChat, ContentChat } from "./styles";
import ChatList from "./ChatList/Index";
import Messages from "./Messages";
import { useState } from "react";
import { IChat } from "../../services/useChat/types";

export default function Chat() {

  const [selectedChat, setSelectedChat] = useState<IChat>()
  return (
    <ContainerChat>
      <BarChat>
        <Typography
          sx={{ font: (t) => t.font.md, flex: 4, paddingLeft: "60px" }}
        >
          Mensagens
        </Typography>
        <Box
          sx={{
            flex: 6,
            display: "flex",
            alignItems: "center",
            columnGap: "12px",
          }}
        >
          <AccountCircle color="primary" sx={{ fontSize: "56px" }} />
          <Typography sx={{ font: (t) => t.font.md }}>Silvio José</Typography>
        </Box>
      </BarChat>
      <ContentChat>
        <ChatList handleViewChat={setSelectedChat} />
        {selectedChat ? 
        <Messages chat={selectedChat} />
      : null}
      </ContentChat>
    </ContainerChat>
  );
}

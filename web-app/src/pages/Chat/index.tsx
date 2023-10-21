import { Box, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { BarChat, ContainerChat, ContentChat } from "./styles";
import ChatList from "./ChatList/Index";
import Messages from "./Messages";
import { useContext, useState } from "react";
import { IChat } from "../../services/useChat/types";
import { AuthContext } from "../../contexts/AuthContext";

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState<IChat>();

  const [authData] = useContext(AuthContext);
  
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
          {selectedChat ? (
            <>
              <AccountCircle color="primary" sx={{ fontSize: "56px" }} />
              <Typography sx={{ font: (t) => t.font.md }}>
                {selectedChat?.first_user.id === authData?.userData?.id
                  ? selectedChat?.second_user.name
                  : selectedChat?.first_user.name}
              </Typography>
            </>
          ) : null}
        </Box>
      </BarChat>
      <ContentChat>
        <ChatList
          userData={authData?.userData}
          handleViewChat={setSelectedChat}
          selected={selectedChat}
        />
        {selectedChat ? <Messages chat={selectedChat} /> : null}
      </ContentChat>
    </ContainerChat>
  );
}

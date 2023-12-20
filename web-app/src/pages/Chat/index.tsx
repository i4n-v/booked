import { Box, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { BarChat, ContainerChat, ContentChat } from "./styles";
import Messages from "./Messages";
import { useContext, useState } from "react";
import { IChat } from "../../services/useChat/types";
import { AuthContext } from "../../contexts/AuthContext";
import ChatList from "./ChatList/Index";
import MoreOptions from "../../components/MoreOptions";
import Page from "../../components/Dialog";
import GroupForm from "./GroupForm";
import ProfilePhoto from "./ProfilePhoto";

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState<IChat>();

  const [authData] = useContext(AuthContext);
  const [chatListOptions, setOpenChatListOptions] = useState(false);
  const [chatOptions, setOpenChatOptions] = useState(false);
  const [openGroupForm, setOpenGroupForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  function handleClose() {
    setOpenGroupForm(false);
    setIsEdit(false);
  }
  return (
    <>
      <Page
        maxWidth={"md"}
        minWidth={"900px"}
        minHeight={488}
        onClose={handleClose}
        open={openGroupForm}
        title="Grupos"
      >
        <GroupForm
          handleClose={handleClose}
          isEdit={isEdit}
          selectedChat={selectedChat}
        />
      </Page>
      <ContainerChat>
        <BarChat>
          <Box
            sx={{
              flex: 3.6,
              paddingLeft: "60px",
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <MoreOptions
              options={[
                {
                  label: "Criar Grupo",
                  handler: () => {
                    setOpenGroupForm(true);
                  },
                },
              ]}
              open={chatListOptions}
              handleOpen={setOpenChatListOptions}
              id="chatListOptions"
            />
            <Typography sx={{ font: (t) => t.font.md }}>Mensagens</Typography>
          </Box>
          <Box
            sx={{
              flex: 6,
              display: "flex",
              alignItems: "center",
              columnGap: "12px",
              "& #chatOptions": {
                marginRight: "15px",
              },
            }}
          >
            {selectedChat ? (
              <>
                {selectedChat?.users.find(
                  (user) => user.id !== authData?.userData?.id
                )?.photo_url ? (
                  <ProfilePhoto
                    src={
                      selectedChat?.users.find(
                        (user) => user.id !== authData?.userData?.id
                      )?.photo_url
                    }
                    size={"56px"}
                  />
                ) : (
                  <AccountCircle color="primary" sx={{ fontSize: "56px" }} />
                )}
                <Typography sx={{ font: (t) => t.font.md }}>
                  {selectedChat?.name ||
                    selectedChat?.users.find(
                      (user) => user.id !== authData?.userData?.id
                    )?.name}
                </Typography>
                {selectedChat.name ? (
                  <MoreOptions
                    options={[
                      {
                        label: "Editar Grupo",
                        handler: () => {
                          setOpenGroupForm(true);
                          setIsEdit(true);
                        },
                      },
                    ]}
                    open={chatOptions}
                    handleOpen={setOpenChatOptions}
                    id="chatOptions"
                  />
                ) : null}
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
    </>
  );
}

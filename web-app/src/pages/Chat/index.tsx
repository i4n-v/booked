import { Box, Button, IconButton, Typography } from "@mui/material";
import { AccountCircle, Person, Search, Send } from "@mui/icons-material";
import {
  BarChat,
  ChatList,
  ChatListContainer,
  ChatMessages,
  ChatMessagesContainer,
  ContainerChat,
  ContentChat,
  SearchChat,
  SendMessage,
} from "./styles";
import Input from "../../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import ChatItem from "./ChatItem";
import Message from "./Message";

export default function Chat() {
  const form = useForm();
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
        <ChatListContainer>
          <SearchChat>
            <FormProvider {...form}>
              <form>
                <Input
                  type="text"
                  name="search"
                  placeholder="Buscar..."
                  inputProps={{ maxLength: 255 }}
                  icon={{
                    right: (
                      <IconButton color="primary" type="submit">
                        <Search />
                      </IconButton>
                    ),
                  }}
                />
                <Person color="primary" sx={{ fontSize: "32px" }} />
              </form>
            </FormProvider>
          </SearchChat>
          <ChatList>
            <ChatItem active={true} />
            <ChatItem active={false} />
            <ChatItem active={false} />
            <ChatItem active={false} />
            <ChatItem active={false} />
            <ChatItem active={false} />
          </ChatList>
        </ChatListContainer>
        <ChatMessagesContainer>
          <SendMessage>
            <FormProvider {...form}>
              <form>
                <Input
                  type="text"
                  name="search"
                  inputProps={{ maxLength: 255 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ fontSize: "32px" }}
                >
                  <Send />
                </Button>
              </form>
            </FormProvider>
          </SendMessage>
          <ChatMessages>
            <Message showAccount response />
            <Message showAccount={false} response={true} />
            <Message showAccount={false} response={false} />
            <Message showAccount={false} response={false} />
            <Message showAccount response />
            <Message showAccount={false} response={true} />
            <Message showAccount={false} response={false} />
            <Message showAccount={false} response={false} />
            <Message showAccount response />
            <Message showAccount={false} response={true} />
            <Message showAccount={false} response={false} />
            <Message showAccount={false} response={false} />

            <Message showAccount response />
            <Message showAccount={false} response={true} />
            <Message showAccount={false} response={false} />
            <Message showAccount={false} response={false} />
          </ChatMessages>
        </ChatMessagesContainer>
      </ContentChat>
    </ContainerChat>
  );
}

import { FormProvider, useForm } from "react-hook-form";
import { ChatListBox, ChatListContainer, SearchChat } from "./styles";
import { IconButton } from "@mui/material";
import { Person, Search } from "@mui/icons-material";
import Input from "../../../components/Input";
import ChatItem from "./ChatItem";
import useChat from "../../../services/useChat";
import { useQuery } from "react-query";
import { useContext, useState } from "react";
import { IChat } from "../../../services/useChat/types";
import { AuthContext } from "../../../contexts/AuthContext";

export default function ChatList({
  handleViewChat,
}: {
  handleViewChat: React.Dispatch<React.SetStateAction<IChat | undefined>>;
}) {
  const form = useForm();

  const { getChats } = useChat();

  const [authData] = useContext(AuthContext);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const chats = useQuery("getChats", () => getChats({ page, limit }));
  return (
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
      <ChatListBox>
        {chats.data?.items?.map((chat) => (
          <ChatItem
            onClick={() => handleViewChat(chat)}
            username={chat.second_user.id === authData?.userData?.id ? chat.first_user.name : chat.second_user.name}
            active={true}
            unread_messages={chat.unreaded_messages}
            last_message={chat.messages[0]?.content}
          />
        ))}
      </ChatListBox>
    </ChatListContainer>
  );
}

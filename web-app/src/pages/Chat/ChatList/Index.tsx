import { FormProvider, useForm } from "react-hook-form";
import { ChatListBox, ChatListContainer, SearchChat } from "./styles";
import { IconButton } from "@mui/material";
import { Person, Search } from "@mui/icons-material";
import Input from "../../../components/Input";
import ChatItem from "./ChatItem";
import useChat from "../../../services/useChat";
import { useQuery } from "react-query";
import { useContext, useEffect, useState } from "react";
import { IChat } from "../../../services/useChat/types";
import { AuthContext } from "../../../contexts/AuthContext";
import socket from "../../../configs/socket";

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
  const [chatsToShow, setChatsToShow] = useState<IChat[]>([]);

  const chats = useQuery("getChats", () => getChats({ page, limit }), {
    onSuccess: (data) => {
      setChatsToShow(data.items);
    },
    suspense: false,
  });

  useEffect(() => {
    socket.on(`receive-chat-${authData?.userData?.id}`, (arg) => {
      // console.log(arg);
      const existIndex = chatsToShow.findIndex((item) => arg.id === item.id);
      console.log(existIndex);
      console.log(chatsToShow);
      if (existIndex !== -1) {
        // setChatsToShow((curr) => [...curr.splice(existIndex, 1), arg]);
      } else {
        // chatsToShow.push(arg);
      }
    });
    return () => {
      socket.off(`receive-chat-${authData?.userData?.id}`);
    };
  }, []);
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
        {chatsToShow.map((chat, index) => (
          <ChatItem
            // key={index}
            onClick={() => handleViewChat(chat)}
            username={
              chat.second_user.id === authData?.userData?.id
                ? chat.first_user.name
                : chat.second_user.name
            }
            active={true}
            unread_messages={chat.unreaded_messages}
            last_message={chat.messages[0]?.content}
          />
        ))}
      </ChatListBox>
    </ChatListContainer>
  );
}

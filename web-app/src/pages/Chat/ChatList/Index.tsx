import { FormProvider, useForm } from "react-hook-form";
import { ChatListBox, ChatListContainer, SearchChat } from "./styles";
import { IconButton } from "@mui/material";
import { Person, Search } from "@mui/icons-material";
import Input from "../../../components/Input";
import ChatItem from "./ChatItem";
import { IChat } from "../../../services/useChat/types";
import socket from "../../../configs/socket";
import { remove } from "lodash";
import IUser from "../../../commons/IUser";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import useChat from "../../../services/useChat";
import usePaginateScroll from "../../../helpers/PaginateScroll";

export default function ChatList({
  handleViewChat,
  userData,
  selected
}: {
  handleViewChat: React.Dispatch<React.SetStateAction<IChat | undefined>>;
  userData: Partial<IUser> | undefined,
  selected?: IChat
}) {
  const form = useForm();
  const { getChats } = useChat();
  const [chatsToShow, setChatsToShow] = useState<IChat[]>([]);
  const targetRef= useRef(null)
  const {page,setMaxPage,paginateTrigger} = usePaginateScroll(targetRef)
  useQuery(["getChats",page], () => getChats({ page, limit: 10 }), {
    onSuccess: (data) => {
      setMaxPage(data.totalPages)
      if (data.current > 1) {
        setChatsToShow((curr) => [...curr,...data.items ]);
        return;
      }
      setChatsToShow(data.items);
    },
    suspense: false,
  });
  useEffect(() => {
    socket.on(`receive-chat-${userData?.id}`, (arg) => {
      setChatsToShow((curr) => [arg,...remove(curr,(item) => !(arg.id === item.id))])
    });
    return () => {
      socket.off(`receive-chat-${userData?.id}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <ChatListBox ref={targetRef} onScrollCapture={paginateTrigger}>
        {chatsToShow.map((chat, index) => (
          <ChatItem
            key={index}
            onClick={() => handleViewChat(chat)}
            username={
              chat.second_user.id === userData?.id
                ? chat.first_user.name
                : chat.second_user.name
            }
            active={selected?.id === chat.id}
            unread_messages={chat.unreaded_messages}
            last_message={chat.messages[0]?.content}
          />
        ))}
      </ChatListBox>
    </ChatListContainer>
  );
}

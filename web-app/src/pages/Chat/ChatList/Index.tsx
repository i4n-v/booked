import { FormProvider, useForm } from "react-hook-form";
import { ChatListBox, ChatListContainer, SearchChat } from "./styles";
import { Box, IconButton } from "@mui/material";
import { Filter, Person, Search } from "@mui/icons-material";
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
import useDebounce from "../../../helpers/Debounce";
import { Params } from "../../../commons/Params";
import useUser from "../../../services/useUser";

export default function ChatList({
  handleViewChat,
  userData,
  selected,
}: {
  handleViewChat: React.Dispatch<React.SetStateAction<IChat | undefined>>;
  userData: Partial<IUser> | undefined;
  selected?: IChat;
}) {
  const form = useForm({
    defaultValues: {
      search: "",
    },
  });
  const { watch } = form;
  const [findUser, setFindUser] = useState(false);
  const [filters, setFilters] = useState<{ chat?: Params; user?: Params }>({});
  const { getChats } = useChat();
  const { getUsers } = useUser();
  const [chatsToShow, setChatsToShow] = useState<IChat[]>([]);
  const [usersToShow, setUsersToShow] = useState<IUser[]>([]);
  const targetRef = useRef(null);
  const { page, setMaxPage, paginateTrigger, reset } = usePaginateScroll(targetRef);
  useQuery(
    ["getChats", page, filters.chat],
    () => getChats({ page, limit: 10, ...filters.chat }),
    {
      onSuccess: (data) => {
        setMaxPage(data?.totalPages);
        if (data.current > 1) {
          setChatsToShow((curr) => [...curr, ...data.items]);
          return;
        }
        setChatsToShow(data.items);
      },
      suspense: false,
      enabled: !findUser
    }
  );

  useQuery(["getUsers", page, filters.user], () => getUsers({ page, limit: 10, ...filters.user }), {
    onSuccess: (data) => {
      setMaxPage(data?.totalPages);
      if (data.current > 1) {
        setUsersToShow((curr) => [...curr, ...data.items]);
        return;
      }
      setUsersToShow(data.items);
    },
    suspense: false,
    enabled: findUser,
  });
  useEffect(() => {
    socket.on(`receive-chat-${userData?.id}`, (arg) => {
      console.log(arg)
      setChatsToShow((curr) => [
        arg,
        ...remove(curr, (item) => !(arg.id === item.id)),
      ]);
    });
    return () => {
      socket.off(`receive-chat-${userData?.id}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debounceSearch = useDebounce((value, findUser) => {
    if (!value) return
    if (findUser) {
      reset();
      setFilters({ user: { name: value } });
    } else {
      reset();
      setFilters({ chat: { name: value } });
    }
  }, 500);

  const search = form.handleSubmit(({ search }) => debounceSearch(search, findUser));

  useEffect(() => {
    const subscription = watch((value) => debounceSearch(value.search, findUser));
    return () => subscription.unsubscribe();
  }, [watch, findUser]);

  useEffect(() => {
    reset();
    form.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findUser])

  return (
    <ChatListContainer>
      <SearchChat>
        <FormProvider {...form}>
          <form onSubmit={search}>
            <Input
              type="text"
              name="search"
              placeholder="Buscar..."
              inputProps={{ maxLength: 255 }}
              // onChange={(e) => debounceSearch(e.target.value)}
              icon={{
                right: (
                  <IconButton color="primary" type="submit">
                    <Search />
                  </IconButton>
                ),
              }}
            />
            <Box
              sx={{
                backgroundColor: (t) =>
                  findUser ? t.palette.primary.main : "inherit",
                minWidth: "10%",
                minHeight: "100%",
                borderRadius: "6px",
                color: (t) => (findUser ? "white" : t.palette.primary.main),
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => setFindUser(!findUser)}
            >
              <Person sx={{ fontSize: "32px" }} />
            </Box>
          </form>
        </FormProvider>
      </SearchChat>
      <ChatListBox ref={targetRef} onScrollCapture={paginateTrigger}>
        {!findUser
          ? chatsToShow?.map((chat, index) => (
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
              last_update={chat.messages[0]?.updatedAt || chat.messages[0]?.createdAt}
            />
          ))
          : usersToShow?.map((user, index) => (
            <ChatItem
              key={index}
              onClick={() =>
                handleViewChat({
                  first_user: userData as IUser,
                  second_user: user,
                  id: user.chats?.[0]?.id
                } as IChat)
              }
              username={user.name}
              active={selected?.second_user?.id === user.id}
              unread_messages={0}
              last_message={""}
            />
          ))}
      </ChatListBox>
    </ChatListContainer>
  );
}

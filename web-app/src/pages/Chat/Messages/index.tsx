import { FormProvider, useForm } from "react-hook-form";
import { ChatMessages, ChatMessagesContainer, NewMessage } from "./styles";
import Input from "../../../components/Input";
import {  Button } from "@mui/material";
import { Send } from "@mui/icons-material";
import Message from "./Message";
import useMessage from "../../../services/useMessage";
import { useMutation, useQuery } from "react-query";
import useChat from "../../../services/useChat";
import { IChat } from "../../../services/useChat/types";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { IMessage } from "../../../services/useMessage/types";
import socket from "../../../configs/socket";
import IUser from "../../../commons/IUser";
import usePaginateScroll from "../../../helpers/PaginateScroll";

export default function Messages({ chat }: { chat: IChat }) {
  const form = useForm({
    defaultValues: {
      message: "",
    },
  });

  const [messagesToShow, setMessagesToShow] = useState<IMessage[]>([]);

  const [authData] = useContext(AuthContext);

  const receiver: IUser =
    chat.first_user.id !== authData?.userData?.id
      ? chat.first_user
      : chat.second_user;

  const { createMessage } = useMessage();
  const { getMessages } = useChat();
  const targetRef = useRef(null);
  const { page, paginateTrigger, setMaxPage, reset } = usePaginateScroll(
    targetRef,
    true
  );
  useQuery(
    ["chatMessages", chat.id, page],
    () => getMessages(chat.id as string, { page, limit: 10 }),
    {
      onSuccess: (data) => {
        setMaxPage(data.totalPages);
        if (data.current > 1) {
          setMessagesToShow((curr) => [...curr, ...data.items]);
        } else {
          setMessagesToShow(data.items);
        }
      },
      suspense: false,
    }
  );
  const sendMutation = useMutation({
    mutationFn: createMessage,
    mutationKey: "sendMessage",
  });

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat]);

  const sendMessage = form.handleSubmit(({ message }: { message: string }) => {
    if (!message) return;
    sendMutation.mutate(
      {
        chat_id: chat.id as string,
        content: message,
        receiver_id: receiver.id as string,
        sender_id: authData?.userData?.id as string,
      },
      {
        onSuccess: (data) => {
          form.reset();
          setMessagesToShow((curr) => [
            { content: message, sender: authData?.userData } as IMessage,
            ...curr,
          ]);
        },
      }
    );
  });

  useEffect(() => {
    socket.emit("enter-in-chat", chat.id);
  },[chat])

  useEffect(() => {
    socket.on(`receive-message-${chat.id}-${authData?.userData?.id}`, (arg) => {
      console.log(arg)
      if (arg.chat_id === chat.id) {
        socket.emit("enter-in-chat", chat.id);
        setMessagesToShow((curr) => [arg, ...curr]);
      }
    });
    return () => {
      socket.off(`receive-message-${chat.id}-${authData?.userData?.id}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChatMessagesContainer>
      <NewMessage>
        <FormProvider {...form}>
          <form onSubmit={sendMessage}>
            <Input type="text" name="message" inputProps={{ maxLength: 255 }} />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ fontSize: "32px" }}
            >
              <Send />
            </Button>
          </form>
        </FormProvider>
      </NewMessage>
      <ChatMessages ref={targetRef} onScrollCapture={paginateTrigger}>
        {/* <Box sx={{textAlign: "center",font: t => t.font.xs}}>
              Someone is typing...
        </Box> */}
        {messagesToShow?.map((message, index, array) => {
          const itsMine = message.sender?.id === authData?.userData?.id;
          const showProfile =
            array[index - 1]?.sender?.id !== message.sender?.id;
          return (
            <Message
              key={index}
              content={message.content}
              showAccount={showProfile}
              response={!itsMine}
            />
          );
        })}
      </ChatMessages>
    </ChatMessagesContainer>
  );
}

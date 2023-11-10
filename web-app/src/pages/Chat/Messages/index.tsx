import { FormProvider, useForm } from "react-hook-form";
import { ChatMessages, ChatMessagesContainer, NewMessage } from "./styles";
import Input from "../../../components/Input";
import { Box, Button } from "@mui/material";
import { Photo, Send } from "@mui/icons-material";
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
import useNotifier from "../../../helpers/Notify";
import InputFile from "../../../components/Input/File";
import MessageImagePreview from "./Image/Preview";

export default function Messages({ chat }: { chat: IChat }) {
  const form = useForm({
    defaultValues: {
      message: "",
      image: undefined,
    },
  });

  const [messagesToShow, setMessagesToShow] = useState<IMessage[]>([]);
  const [authData] = useContext(AuthContext);

  const receiver: IUser =
    chat.first_user.id !== authData?.userData?.id
      ? chat.first_user
      : chat.second_user;

  const { createMessage, deleteMessage } = useMessage();
  const { getMessages } = useChat();
  const notify = useNotifier();
  const targetRef = useRef(null);
  const { page, paginateTrigger, setMaxPage, reset } = usePaginateScroll(
    targetRef,
    true
  );
  const deleteMutation = useMutation({
    mutationKey: "MessageDelete",
    mutationFn: deleteMessage,
  });
  useQuery(
    ["chatMessages", chat, page],
    () => getMessages(chat.id as string, { page, limit: 10 }),
    {
      onSuccess: (data) => {
        setMaxPage(data?.totalPages);
        if (data.current > 1) {
          setMessagesToShow((curr) => [...curr, ...data.items]);
        } else {
          setMessagesToShow(data.items || []);
        }
      },
      suspense: false,
      enabled: !!chat,
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

  const sendMessage = form.handleSubmit(({ message, image }) => {
    let photo_url: string = '';
    if (image) {
      photo_url = URL.createObjectURL(new Blob([image!]))
    }
    if (!message && !photo_url) return;
    sendMutation.mutate(
      {
        chat_id: chat.id as string,
        content: message,
        photo: image,
        receiver_id: receiver.id as string,
        sender_id: authData?.userData?.id as string,
      },
      {
        onSuccess: (data) => {
          form.reset();
          form.resetField('image')
          setMessagesToShow((curr) => [
            { content: message, photo_url: photo_url, sender: authData?.userData } as IMessage,
            ...curr,
          ]);
          if (!chat.id) {
            chat.id = data.chat_id;
          }
        },
      }
    );
  });

  function messageDelete(id: string) {
    deleteMutation.mutate(id, {
      onSuccess: (data) => {
        setMessagesToShow((value) => value.filter((i) => i.id !== id));
        notify(data.message, "success");
      },
    });
  }
  useEffect(() => {
    socket.emit("enter-in-chat", chat.id);
  }, [chat]);

  useEffect(() => {
    socket.on(`receive-message-${chat.id}-${authData?.userData?.id}`, (arg) => {
      console.log(arg)
      if (arg.chat_id === chat.id) {
        socket.emit("enter-in-chat", chat.id);
        setMessagesToShow((curr) => [arg, ...curr]);
      }
    });

    socket.on(`deleted-message-${chat.id}-${authData?.userData?.id}`, (arg) => {
      setMessagesToShow((value) => value.filter((i) => i.id !== arg));
    });
    return () => {
      socket.off(`receive-message-${chat.id}-${authData?.userData?.id}`);
      socket.off(`deleted-message-${chat.id}-${authData?.userData?.id}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat.id]);

  form.watch(({ image, message }, { name }) => {
    if (name === "image" && message) {
      form.resetField("message");
    }
  });

  return (
    <ChatMessagesContainer>
      <NewMessage>
        <FormProvider {...form}>
          <form onSubmit={sendMessage}>
            <Input
              type="text"
              name="message"
              disabled={!!form.watch("image")}
              inputProps={{ maxLength: 255 }}
            />
            <Box maxWidth={"74px"} position={"relative"}>
              <InputFile
                name="image"
                accept="image/*"
                button
                hiddeFileName
                customIcon={<Photo />}
              />
            </Box>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            font: (t) => t.font.xs,
          }}
        >
          <MessageImagePreview
            image={form.watch("image") as unknown as ArrayBuffer}
            removeImage={() => {
              form.resetField("image");
            }}
          />
        </Box>
        {messagesToShow?.map((message, index, array) => {
          const itsMine = message.sender?.id === authData?.userData?.id;
          const showProfile =
            array[index - 1]?.sender?.id !== message.sender?.id;
          return (
            <Message
              key={index}
              content={message.content}
              photo={message.photo_url}
              showAccount={showProfile}
              response={!itsMine}
              id={index}
              actionsOptions={[
                {
                  label: "Delete",
                  handler: () => messageDelete(message.id),
                },
              ]}
            />
          );
        })}
      </ChatMessages>
    </ChatMessagesContainer>
  );
}

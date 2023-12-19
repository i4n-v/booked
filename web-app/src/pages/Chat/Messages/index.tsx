import { FormProvider, useForm } from "react-hook-form";
import {
  ChatMessages,
  ChatMessagesContainer,
  NewMessage,
  SeeMore,
} from "./styles";
import Input from "../../../components/Input";
import { Box, Button } from "@mui/material";
import { MenuBook, Photo, Send } from "@mui/icons-material";
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
import InputSelect from "../../../components/Input/Select";
import useBook from "../../../services/useBook";

export default function Messages({ chat }: { chat: IChat }) {
  const form = useForm({
    defaultValues: {
      message: "",
      image: undefined,
      books: [],
    },
  });

  const [messagesToShow, setMessagesToShow] = useState<IMessage[]>([]);
  const [sendBook, setSendBook] = useState(false);
  const [authData] = useContext(AuthContext);

  const receiver: IUser | undefined = chat.users.find(
    (user) => user.id !== authData?.userData?.id
  );

  const { createMessage, deleteMessage } = useMessage();
  const { getMessages } = useChat();
  const { getBooks } = useBook();
  const notify = useNotifier();
  const targetRef = useRef(null);
  const { page, setMaxPage, maxPage, setPage } = usePaginateScroll(
    targetRef,
    true
  );
  const deleteMutation = useMutation({
    mutationKey: "MessageDelete",
    mutationFn: deleteMessage,
  });
  const { isFetching } = useQuery(
    ["chatMessages", chat, page],
    () => {
      if (chat.id) return getMessages(chat.id as string, { page, limit: 10 });
    },
    {
      onSuccess: (data) => {
        setMaxPage(data?.totalPages || 0);
        if (data?.current && data?.current > 1) {
          setMessagesToShow((curr) => [...curr, ...data.items]);
        } else if (data?.items) {
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
    return () => {
      setMessagesToShow([]);
      setPage(1);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat]);

  const sendMessage = form.handleSubmit(({ message, image, books }) => {
    let photo_url: string = "";
    if (image) {
      photo_url = URL.createObjectURL(new Blob([image!]));
    }

    if (!message && !photo_url && !books.length) return;
    sendMutation.mutate(
      {
        chat_id: chat.id as string,
        content: message,
        photo: image,
        receiver_id: receiver?.id as string,
        sender_id: authData?.userData?.id as string,
        books: books,
      },
      {
        onSuccess: (data) => {
          form.reset();
          form.resetField("image");
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
    socket.on(`receive-message-${chat.id}`, (arg: any) => {
      if (arg.chat_id === chat.id) {
        socket.emit("enter-in-chat", chat.id);
        setMessagesToShow((curr) => [arg, ...curr]);
      }
    });

    socket.on(
      `deleted-message-${chat.id}-${authData?.userData?.id}`,
      (arg: any) => {
        setMessagesToShow((value) => value.filter((i) => i.id !== arg));
      }
    );
    return () => {
      socket.off(`receive-message-${chat.id}-${authData?.userData?.id}`);
      socket.off(`deleted-message-${chat.id}-${authData?.userData?.id}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat.id]);

  form.watch(({ image, message, books }, { name }) => {
    if (name === "image" && (message || books?.length)) {
      form.resetField("message");
      form.resetField("books");
      setSendBook(false);
    }
  });

  return (
    <ChatMessagesContainer>
      <NewMessage>
        <FormProvider {...form}>
          <form onSubmit={sendMessage}>
            {sendBook ? (
              <InputSelect
                service={getBooks}
                name="books"
                optionLabel="name"
                disabled={!!form.watch("image")}
                label="Selecionar livros"
                multiple
              />
            ) : (
              <Input
                type="text"
                name="message"
                disabled={!!form.watch("image")}
                inputProps={{ maxLength: 255 }}
              />
            )}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ fontSize: "32px" }}
            >
              <Send />
            </Button>
            <Button
              variant={sendBook ? "contained" : "outlined"}
              onClick={() => {
                if (!sendBook) {
                  form.resetField("image");
                  form.resetField("message");
                }
                setSendBook(!sendBook);
              }}
              color="primary"
              sx={{ fontSize: "32px", width: "64px" }}
            >
              <MenuBook />
            </Button>
            <Box maxWidth={"74px"} position={"relative"}>
              <InputFile
                name="image"
                accept=".png, .jpg, .jpeg"
                button
                hiddeFileName
                disabled={sendBook}
                customIcon={<Photo />}
              />
            </Box>
          </form>
        </FormProvider>
      </NewMessage>
      <ChatMessages>
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
              books={message.books}
              showAccount={showProfile}
              username={message.sender.name}
              profile_photo={message.sender.photo_url}
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
        {!isFetching && page < maxPage ? (
          <SeeMore onClick={() => setPage(page + 1)}>
            Ver mais mensagens
          </SeeMore>
        ) : null}
      </ChatMessages>
    </ChatMessagesContainer>
  );
}

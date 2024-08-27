import { TextField } from "@/components/FormFields";
import { useLocalSearchParams } from "expo-router";
import Message from "../../../../../components/Chat/Message";
import { useMutation, useQuery } from "react-query";
import { useChat, useMessage } from "@/services";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Styled from "./styled";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Send from "@/components/Icons/Send";
import Book from "@/components/Icons/Book";
import IUser from "@/types/User";
import { IMessage } from "@/types/Message";
import { FlatList } from "@/components/Lists";
import { Skeleton } from "@/components/Loading";

const validations = z
  .object({
    message: z.string(),
    image: z.any().nullable(),
    books: z.array(z.string()),
  })
  .required();

type IMessageForm = z.infer<typeof validations>;

function Messages() {
  const params = useLocalSearchParams<{ id: string }>();
  const { control, watch, handleSubmit, reset, resetField } = useForm<IMessageForm>({
    resolver: zodResolver(validations),
    defaultValues: {
      message: "",
      image: null,
      books: [],
    },
  });
  const [message_field] = watch(["message"]);
  const { user, socket } = useContext(AuthContext)!;
  const { getMessages, getChat } = useChat();
  const { createMessage } = useMessage();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [page, setPage] = useState<{ current: number; max: number }>({
    current: 1,
    max: 1,
  });
  const sendMutation = useMutation({
    mutationFn: createMessage,
    mutationKey: "create-message",
  });
  const { isFetching } = useQuery({
    queryFn: () => getMessages(params.id, { page: page.current, limit: 5 }),
    queryKey: ["get-messages", params.id, page.current],
    onSuccess(data) {
      setPage(({ current }) => ({ current, max: data?.totalPages || 0 }));
      if (data?.current && data?.current > 1) {
        setMessages((curr) => [...curr, ...data.items]);
      } else if (data?.items) {
        setMessages(data.items);
      }
    },
  });

  const { data: chat } = useQuery({
    queryFn: () => getChat({ id: params.id }),
    queryKey: ["get-chat", params.id],
  });

  const sendMessage = handleSubmit(({ message, books, image }) => {
    let photo_url: string = "";
    if (image) {
      photo_url = URL.createObjectURL(new Blob([image!]));
    }
    const receiver: IUser | undefined = chat?.users.find((chatUser) => chatUser.id !== user?.id);

    if (!message && !photo_url && !books.length) return;
    sendMutation.mutate(
      {
        chat_id: params.id,
        content: message,
        photo: image,
        receiver_id: receiver?.id as string,
        sender_id: user?.id as string,
        books: books,
      },
      {
        onSuccess: (data) => {
          reset();
          resetField("image");
          if (!chat) {
            params.id = data.chat_id;
          }
        },
      },
    );
  });

  useEffect(() => {
    socket?.emit("enter-in-chat", params.id);
  }, [chat]);

  useEffect(() => {
    socket?.on(`receive-message-${params.id}`, (arg: any) => {
      if (arg.chat_id === params.id) {
        socket.emit("enter-in-chat", params.id);
        setMessages((curr) => [arg, ...curr]);
      }
    });

    socket?.on(`deleted-message-${params.id}-${user?.id}`, (arg: any) => {
      setMessages((value) => value.filter((i) => i.id !== arg));
    });
    return () => {
      socket?.off(`receive-message-${params.id}-${user?.id}`);
      socket?.off(`deleted-message-${params.id}-${user?.id}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <Styled.Container>
      <Styled.SendSession>
        <TextField<any> control={control} name="message" containerProps={{ style: { flex: 1 } }} />
        {message_field ? (
          <Styled.Button onPress={sendMessage}>
            <Send />
          </Styled.Button>
        ) : (
          <>
            <Styled.Button variant="outlined">
              <Book />
            </Styled.Button>
            {/* <FileField control={control} name="image" /> */}
          </>
        )}
      </Styled.SendSession>
      <Styled.MessagesSession>
        <FlatList
          data={messages}
          inverted
          loading={isFetching}
          ListFooterComponent={<Skeleton template="message" quantity={2} />}
          contentContainerStyle={{ paddingBottom: 300,rowGap:10 }}
          onEndReached={() => {
            if (page.current < page.max && !isFetching) {
              setPage((curr) => ({ current: curr.current + 1, max: curr.max }));
            }
          }}
          renderItem={({ item }) => (
            <Message mine={item.sender.id === user?.id} content={item.content} />
          )}
        />
      </Styled.MessagesSession>
    </Styled.Container>
  );
}

export default Messages;

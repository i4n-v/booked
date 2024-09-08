import { TextField } from "@/components/FormFields";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Message from "../../../../../components/Chat/Message";
import { useMutation, useQuery } from "react-query";
import { useBook, useChat, useMessage, useUser } from "@/services";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
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
import FileField from "@/components/FormFields/FileField";
import { BottomSheet } from "@/components/BottomSheets";
import { useBottomSheet, useDebounceCallback, useNotifier } from "@/hooks";
import { Dimensions, ImageBackground, View } from "react-native";
import { Search } from "@/components/Icons";
import IBook from "@/types/Book";
import Close from "@/components/Icons/Close";
import { IChat } from "@/types/Chat";
import { BottomSheetButton, BottomSheetHeader, BottomSheetTitle } from "../styles";

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
  const { openNotification } = useNotifier();
  const [refFilter, handleOpenFilter, handleCloseFilter] = useBottomSheet();
  const [refImageView, handleOpenImage, handleCloseImage] = useBottomSheet();
  const { control, watch, handleSubmit, reset, resetField, setValue } = useForm<IMessageForm>({
    resolver: zodResolver(validations),
    defaultValues: {
      message: "",
      image: null,
      books: [],
    },
  });
  const [message_field, image] = watch(["message", "image"]);
  const { user, socket, token } = useContext(AuthContext)!;
  const { getMessages, getChat } = useChat();
  const { createMessage } = useMessage();
  const {getUser} = useUser()
  const { getBooks } = useBook();
  const [chat, setChat] = useState<Partial<IChat> | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [bookSToSend, setBooksToSend] = useState<IBook[]>([]);
  const [bookSearch, setBookSearch] = useState<string>();
  const [viewImage, setViewImage] = useState<string | null>(null);
  const [page, setPage] = useState<{ current: number; max: number }>({
    current: 1,
    max: 1,
  });
  const [receiver,setReveiver] = useState<Partial<IUser>>()
  const debounceBookSearch = useDebounceCallback((value: string) => setBookSearch(value));
  const sendMutation = useMutation({
    mutationFn: createMessage,
    mutationKey: "create-message",
  });

  useQuery({
    queryFn: () => getChat({ id: params?.id }),
    queryKey: ["get-chat", params?.id],
    onSuccess(data) {
      setReveiver(data.users?.find((chatUser) => chatUser.id !== user?.id))
      setChat(data);
    },
    onError(){
      setReveiver({id: params?.id})
    }
  });

  useQuery({
    queryFn: () => getUser(receiver?.id!),
    queryKey: ['get-user'],
    onSuccess(data){
      setReveiver(data)      
    },
    enabled: !!receiver
  })

  const { isFetching } = useQuery({
    queryFn: () => getMessages(chat?.id!, { page: page.current, limit: 5 }),
    queryKey: ["get-messages", chat?.id, page.current],
    onSuccess(data) {
      setPage(({ current }) => ({ current, max: data?.totalPages || 0 }));
      if (data?.current && data?.current > 1) {
        setMessages((curr) => [...curr, ...data.items]);
      } else if (data?.items) {
        setMessages(data.items);
      }
    },
    enabled: !!chat?.id,
  });

  const { data: books } = useQuery({
    queryFn: () => getBooks({ search: bookSearch }),
    queryKey: ["get-books-to-send", bookSearch],
    enabled: !!bookSearch,
  });

  const sendMessage = handleSubmit(({ message, books, image }) => {
    if (image) message = "";
    if (!message && !image && !books.length) return;
    sendMutation.mutate(
      {
        chat_id: chat?.id!,
        content: message,
        photo: image,
        receiver_id: receiver?.id || params.id,
        sender_id: user?.id as string,
        books: books,
      },
      {
        onSuccess: (data) => {
          reset();
          resetField("image");
          if (!chat) {
            setChat({ id: data.chat_id });
          }
          handleCloseFilter();
        },
        onError() {
          reset();
          resetField("image");
          openNotification({ message: "Houve um error ao enviar a mensagem.", status: "error" });
        },
      },
    );
  });

  useEffect(() => {
    socket?.emit("enter-in-chat", chat?.id);
  }, [chat]);

  useEffect(() => {
    if (chat?.id) {
      socket?.on(`receive-message-${chat?.id}`, (arg: any) => {
        if (arg.chat_id === chat?.id) {
          socket.emit("enter-in-chat", chat?.id);
          setMessages((curr) => [arg, ...curr]);
        }
      });

      socket?.on(`deleted-message-${chat?.id}-${user?.id}`, (arg: any) => {
        setMessages((value) => value.filter((i) => i.id !== arg));
      });
    }

    return () => {
      socket?.off(`receive-message-${chat?.id}-${user?.id}`);
      socket?.off(`deleted-message-${chat?.id}-${user?.id}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat]);

  const sendBooks = () => {
    if (!bookSToSend.length) return;
    setValue(
      "books",
      bookSToSend.map((book) => book.id),
    );
    sendMessage();
  };

  function hanldeAddBook(book: IBook) {
    setBooksToSend((curr) => [...curr, book]);
  }
  function hanldeRemoveBook(book: IBook) {
    setBooksToSend((curr) => curr.filter((item) => item.id !== book.id));
  }

  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (chat?.name || receiver?.name) {
      navigation.setOptions({
        title: chat?.name || receiver?.name,
      });
    }
  }, [chat,receiver]);

  return (
    <Styled.Container>
      <BottomSheet
        ref={refImageView}
        snapPoints={["90%"]}
        scrollViewProps={{
          contentContainerStyle: { gap: 20 },
        }}
        onClose={() => setViewImage(null)}
      >
        <View style={{ width, height }}>
          <ImageBackground
            source={{ uri: viewImage! }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>
      </BottomSheet>
      <BottomSheet
        ref={refFilter}
        snapPoints={["75%"]}
        scrollViewProps={{
          contentContainerStyle: { padding: 20, gap: 20 },
        }}
        onClose={() => setBooksToSend([])}
      >
        <Styled.SelectedBooksSession>
          {bookSToSend.map((book) => (
            <Styled.SelectedBookItem key={book.id} onPress={() => hanldeRemoveBook(book)}>
              <Styled.BookListItemTitle numberOfLines={1}>{book.name}</Styled.BookListItemTitle>
            </Styled.SelectedBookItem>
          ))}
        </Styled.SelectedBooksSession>
        <BottomSheetHeader>
          <BottomSheetTitle>SELECIONAR LIVROS</BottomSheetTitle>
          <BottomSheetButton>
            <BottomSheetTitle touchable onPress={() => sendBooks()}>
              ENVIAR
            </BottomSheetTitle>
          </BottomSheetButton>
        </BottomSheetHeader>

        <TextField<any>
          placeholder="Buscar..."
          onChangeText={(e) => debounceBookSearch(e)}
          rightIcon={{ icon: <Search /> }}
        />
        {books?.items.map((item, index) => {
          const added = bookSToSend.some((added) => added.id === item.id);
          return (
            <Styled.BookListItem
              onPress={() => (added ? hanldeRemoveBook(item) : hanldeAddBook(item))}
              key={index}
              active={added}
            >
              <Styled.BookTitle>{item.name}</Styled.BookTitle>
            </Styled.BookListItem>
          );
        })}
      </BottomSheet>
      <Styled.SendSession>
        <TextField<any>
          control={control}
          disabled={!!image}
          name="message"
          containerProps={{ style: { flex: 1 } }}
          rightIcon={!!image ? { icon: <Close />, onPress: () => reset() } : undefined}
        />
        {message_field ? (
          <Styled.Button onPress={sendMessage}>
            <Send />
          </Styled.Button>
        ) : (
          <>
            <Styled.Button onPress={() => handleOpenFilter()} variant="outlined">
              <Book />
            </Styled.Button>
            <FileField
              control={control}
              onSelectFile={(files) => {
                setValue("message", files.name);
              }}
              name="image"
              types={["image/*"]}
            />
          </>
        )}
      </Styled.SendSession>
      <Styled.MessagesSession>
        <FlatList
          data={messages}
          inverted
          loading={isFetching}
          ListFooterComponent={<Skeleton template="message" quantity={2} />}
          emptyMessage={"Envie uma mensagem para iniciar uma conversa."}
          contentContainerStyle={{ paddingBottom: 100, rowGap: 10 }}
          onEndReached={() => {
            if (page.current < page.max && !isFetching) {
              setPage((curr) => ({ current: curr.current + 1, max: curr.max }));
            }
          }}
          renderItem={({ item }) => (
            <Message
              onPressImage={() => {
                setViewImage(item.photo_url);
                handleOpenImage();
              }}
              mine={item.sender.id === user?.id}
              {...item}
            />
          )}
        />
      </Styled.MessagesSession>
    </Styled.Container>
  );
}

export default Messages;

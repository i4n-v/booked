import { IconButton } from "@/components/Buttons";
import { TextField } from "@/components/FormFields";
import {  Search, User } from "@/components/Icons";
import { IFilterBy } from "@/components/Navigation/Headers/SearchHeader/types";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {  View } from "react-native";
import { useTheme } from "styled-components/native";
import { ChatList } from "./styles";
import { useQuery } from "react-query";
import { useChat } from "@/services";
import Item from "../../../../components/Chat/Item";
import { AuthContext } from "@/contexts/AuthContext";
import { IChat } from "@/types/Chat";
import { FlatList } from "@/components/Lists";
import { Skeleton } from "@/components/Loading";

function FirstExample() {
  const form = useForm();
  const [filterBy, setFilterBy] = useState<IFilterBy>("book");
  const [chats,setChats] = useState<IChat[]>([])
  const [page,setPage] = useState({
    max: 1,
    current: 1
  })
  const theme = useTheme();
  const {getChats} = useChat()
  function toggleFilterType() {
    setFilterBy((filterBy) => (filterBy === "book" ? "author" : "book"));
  }
  const { user: userData,socket } = useContext(AuthContext)!;

const {isFetching} =useQuery({
    queryKey: ['chats',page.current],
    queryFn: () => getChats({page: page.current,limit: 10}),
    onSuccess(data){
      setPage(({current}) => ({current,max: data.totalPages}))
      if (data.current > 1) {
        setChats((curr) => [...curr, ...data.items]);
        return;
      }
      setChats(data.items)    
    }
  })


  useEffect( () => {
    socket?.on(`receive-chat-${userData?.id}`, (arg: IChat) => {
      setChats((curr) => [
        arg,
        ...curr.filter(item => item.id !== arg.id),
      ]);
    });

    return () => {
      socket?.off(`receive-chat-${userData?.id}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);


  return (
    <View>
      <View
        style={{
          padding: 20,
          marginTop:40,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextField<any>
          containerProps={{ style: { width: "85%" } }}
          rightIcon={{
            icon: <Search width={24} height={24} />,
            onPress: () => {},
          }}
        />
        <IconButton<any>
          icon={<User color={filterBy === "author" ? theme.colors.secondary?.[0] : ""} />}
          isFocused={filterBy === "author"}
          focusColor={theme.colors.primary?.[200]}
          onPress={toggleFilterType}
        />
      </View>
      <ChatList>
      <FlatList
          data={chats}
          loading={isFetching}
          ListFooterComponent={<Skeleton template="chat" quantity={3} />}
          contentContainerStyle={{ rowGap:10 }}
          onEndReached={() => {
            if (page.current < page.max && !isFetching) {
              setPage((curr) => ({ current: curr.current + 1, max: curr.max }));
            }
          }}
          renderItem={({ item }) => (
            <Item {...item} />
          )}
        />
      </ChatList>
    </View>
  );
}

export default FirstExample;

import { IconButton } from "@/components/Buttons";
import { TextField } from "@/components/FormFields";
import { Account, ArrowBack, Search, User } from "@/components/Icons";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Text, TouchableHighlight, View } from "react-native";
import { useTheme } from "styled-components/native";
import {
  BottomSheetButton,
  BottomSheetHeader,
  BottomSheetListItem,
  BottomSheetTitle,
  ChatList,
} from "./styles";
import { useMutation, useQuery } from "react-query";
import { useChat, useUser } from "@/services";
import ChatItem from "../../../../components/Chat/Item";
import { AuthContext } from "@/contexts/AuthContext";
import { IChat } from "@/types/Chat";
import { FlatList } from "@/components/Lists";
import { Skeleton } from "@/components/Loading";
import IUser from "@/types/User";
import UserItem from "@/components/Chat/Users";
import { useBottomSheet, useDebounceCallback, useNotifier } from "@/hooks";
import { useNavigation } from "expo-router";
import { BottomSheet, BottomSheetMenu } from "@/components/BottomSheets";
import UserListItem from "@/components/Chat/Users/styles";
import Group from "@/components/Icons/Group";
import { Divider } from "../../(tabs)/home/styles";
import { z } from "zod";
import { UserPhoto } from "@/components/Cards/UserCard/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageParams } from "./types";

const validations = z
  .object({
    users: z.array(z.object({ id: z.string() })).min(3),
    name: z.string().min(1, "Informe um nome para o chat em grupo."),
  })
  .required()
  .refine((data) => data.users.length >= 3, {
    message: "Um grupo deve conter o minimo de 3 participantes.",
    path: ["name"],
  });

type IGroupForm = z.infer<typeof validations>;
function Chat() {
  const { openNotification } = useNotifier();
  const theme = useTheme();
  const navigation = useNavigation();

  const [userGroup, setUsersGroup] = useState<boolean>(false);
  const [filterBy, setFilterBy] = useState<"chats" | "users">("chats");
  const [chats, setChats] = useState<IChat[]>([]);
  const [userList, setUserList] = useState<IUser[]>([]);
  const [page, setPage] = useState<PageParams>({
    max: 1,
    current: 1,
  });
  const [filter, setFilter] = useState<string>();
  const { user: userData, socket } = useContext(AuthContext)!;
  const [refFilter, handleOpenFilter, handleCloseFilter] = useBottomSheet();
  const [refCreateGroup, handleOpenCreateGroup, handleCloseCreateGroup] = useBottomSheet();

  const { getChats, createGroup } = useChat();
  const { getUsers } = useUser();

  const createMutation = useMutation({
    mutationKey: ["createGroup"],
    mutationFn: createGroup,
  });

  const { control, watch, setValue, handleSubmit } = useForm<IGroupForm>({
    defaultValues: {
      users: [],
      name: "",
    },
    resolver: zodResolver(validations),
  });

  const [groupUsers] = watch(["users"]);

  const itemsCallback = {
    chats: getChats,
    users: getUsers,
  };

  const { isFetching } = useQuery({
    queryKey: ["chats", page.current, filter, filterBy],
    queryFn: () => {
      return itemsCallback[filterBy]({ page: page.current, limit: 10, name: filter }) as any;
    },
    onSuccess(data) {
      if (filterBy === "users") {
        setPage(({ current }) => ({ current, max: data.totalPages }));
        if (data.current > 1) {
          setUserList((curr) => [...curr, ...data.items]);
          return;
        }
        setUserList(data.items);
        return;
      }
      setPage(({ current }) => ({ current, max: data.totalPages }));
      if (data.current > 1) {
        setChats((curr) => [...curr, ...data.items]);
        return;
      }
      setChats(data.items);
    },
  });

  useEffect(() => {
    if (userData?.id) {
      socket?.on(`receive-chat-${userData?.id}`, (arg: IChat) => {
        setChats((curr) => [arg, ...curr.filter((item) => item.id !== arg.id)]);
      });
    }
    return () => {
      if (userData?.id) {
        socket?.off(`receive-chat-${userData?.id}`);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Mensagens",
      handleMorePress: handleOpenFilter,
    });
  }, [navigation]);

  const debounceFilter = useDebounceCallback((value: string) => {
    setFilter(value);
    setPage({ current: 1, max: 1 });
  });
  function toggleFilterType() {
    setFilterBy((filterBy) => (filterBy === "chats" ? "users" : "chats"));
  }

  function hanldeAddGroupUser(user: IUser) {
    setValue("users", [...groupUsers, user]);
  }
  function hanldeRemoveGroupUser(user: IUser) {
    setValue(
      "users",
      groupUsers.filter((item) => item.id !== user.id),
    );
  }

  const handleCreateGroup = handleSubmit(({ name, users }) => {
    createMutation.mutate(
      {
        name: name,
        users: users.map((user) => user.id as string),
      },
      {
        onSuccess(data) {
          openNotification({ message: data.message, status: "success" });
          handleCloseCreateGroup();
        },
        onError(data: any) {
          openNotification({ message: data.message, status: "error" });
        },
      },
    );
  });

  const flatListProps = {
    loading: isFetching,
    ListFooterComponent: <Skeleton template="chat" quantity={3} />,
    contentContainerStyle: { rowGap: 10 },
    onEndReached: () => {
      if (page.current < page.max && !isFetching && !userGroup) {
        setPage((curr) => ({ current: curr.current + 1, max: curr.max }));
      }
    },
  };

  return (
    <View>
      <BottomSheet
        ref={refCreateGroup}
        snapPoints={["90%"]}
        scrollViewProps={{
          contentContainerStyle: { padding: 20, gap: 20 },
        }}
        onOpen={() => {
          setFilterBy("users");
          setUsersGroup(true);
        }}
        onClose={() => {
          setFilterBy("chats");
          setUsersGroup(false);
        }}
      >
        <BottomSheetHeader>
          <BottomSheetTitle>CRIAR GRUPO</BottomSheetTitle>
          <BottomSheetButton>
            <BottomSheetTitle touchable onPress={() => handleCreateGroup()}>
              SALVAR
            </BottomSheetTitle>
          </BottomSheetButton>
        </BottomSheetHeader>
        <TextField control={control} name="name" label="Nome do Grupo" />
        <Divider />
        {!!groupUsers.length && (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
            {groupUsers.map((item: any, index: number) => (
              <TouchableHighlight key={index} onPress={() => hanldeRemoveGroupUser(item)}>
                <View style={{ width: 55 }}>
                  {item.photo_url ? (
                    <UserPhoto source={{ uri: item.photo_url }} resizeMode="cover" />
                  ) : (
                    <Account width={42} height={42} />
                  )}
                  <Text numberOfLines={1}>{item.name}</Text>
                </View>
              </TouchableHighlight>
            ))}
          </View>
        )}
        <TextField<any>
          placeholder="Buscar..."
          onChangeText={(e) => debounceFilter(e)}
          rightIcon={{ icon: <Search /> }}
        />
        {userList?.map((item, index) => {
          const added = groupUsers.some((added) => added.id === item.id);
          return (
            <UserItem
              active={added}
              customOnPress={() => (added ? hanldeRemoveGroupUser(item) : hanldeAddGroupUser(item))}
              {...item}
            />
          );
        })}
      </BottomSheet>
      <BottomSheetMenu<any>
        items={[
          {
            text: "Criar Grupo",
            icon: Group,
            onPress: () => {
              handleCloseFilter();
              handleOpenCreateGroup();
            },
          },
        ]}
        ref={refFilter}
      />
      <View
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextField<any>
          containerProps={{ style: { width: "85%" } }}
          onChangeText={(e) => debounceFilter(e)}
          rightIcon={{
            icon: <Search width={24} height={24} />,
          }}
        />
        <IconButton<any>
          icon={<User color={filterBy === "users" ? theme.colors.secondary?.[0] : ""} />}
          isFocused={filterBy === "users"}
          focusColor={theme.colors.primary?.[200]}
          onPress={toggleFilterType}
        />
      </View>
      <ChatList>
        {filterBy === "chats" ? (
          <FlatList
            data={chats}
            renderItem={({ item }) => <ChatItem {...item} />}
            {...flatListProps}
          />
        ) : (
          <FlatList
            data={userList}
            renderItem={({ item }) => <UserItem {...item} />}
            {...flatListProps}
          />
        )}
      </ChatList>
    </View>
  );
}

export default Chat;

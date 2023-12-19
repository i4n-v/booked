import { FormProvider, useForm } from "react-hook-form";
import { GroupFormContainer, UsersList, UsersListItem } from "./styles";
import Input from "../../../components/Input";
import { Box, Button, Typography } from "@mui/material";
import {
  AccountCircle,
  Search,
  SwapHorizontalCircle,
} from "@mui/icons-material";
import useUser from "../../../services/useUser";
import { useMutation, useQuery } from "react-query";
import usePaginateScroll from "../../../helpers/PaginateScroll";
import { useEffect, useRef, useState } from "react";
import IUser from "../../../commons/IUser";
import useChat from "../../../services/useChat";
import useNotifier from "../../../helpers/Notify";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./validation";
import useDebounce from "../../../helpers/Debounce";
import { GroupFormProps } from "./types";

export default function GroupForm({
  handleClose,
  isEdit,
  selectedChat,
}: GroupFormProps) {
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: isEdit ? (selectedChat?.name as string) : "",
    },
  });
  const userListRef = useRef(null);
  const { getUsers } = useUser();
  const { createGroup, updateGroup } = useChat();
  const { page, paginateTrigger, setMaxPage, reset } =
    usePaginateScroll(userListRef);
  const notify = useNotifier();
  const [usersToList, setUsersToList] = useState<IUser[]>([]);
  const [addedUsers, setAddedUsers] = useState<IUser[]>([]);
  const [name, setName] = useState<string>();
  const [addedName, setAddedName] = useState("");
  const debounceName = useDebounce((value) => {
    setName(value);
    reset();
  }, 300);
  const createMutation = useMutation({
    mutationKey: "createGroup",
    mutationFn: createGroup,
  });
  const updateMutation = useMutation({
    mutationKey: "updateGroup",
    mutationFn: updateGroup,
  });
  const usersQuery = useQuery(
    ["usersQuery", page, name],
    () => getUsers({ page, limit: 10, name }),
    {
      onSuccess(data) {
        setMaxPage(data?.totalPages);
        if (data.current > 1) {
          setUsersToList((curr) => [...curr, ...data.items]);
          return;
        }
        setUsersToList(data.items);
      },
      suspense: false,
    }
  );

  function addUser(user: IUser) {
    if (addedUsers.find((value) => value.id === user.id)) {
      return;
    }
    setAddedUsers((curr) => [...curr, user]);
  }
  function removeUser(index: number) {
    setAddedUsers((curr) => curr.filter((user, idx) => idx !== index));
  }

  const handleSubmit = form.handleSubmit((values) => {
    if (isEdit) {
      updateMutation.mutate(
        {
          id: selectedChat?.id as string,
          name: values.name,
          users: addedUsers.map((user) => user.id as string),
        },
        {
          onSuccess(data) {
            notify(data.message, "success");
            handleClose();
          },
          onError(data: any) {
            notify(data.message, "error");
          },
        }
      );
    } else {
      createMutation.mutate(
        {
          name: values.name,
          users: addedUsers.map((user) => user.id as string),
        },
        {
          onSuccess(data) {
            notify(data.message);
            handleClose();
          },
          onError(data: any) {
            notify(data.message, "error");
          },
        }
      );
    }
  });

  useEffect(() => {
    if (isEdit) setAddedUsers(selectedChat?.users as IUser[]);
    return () => {
      setAddedUsers([]);
    };
  }, [isEdit]);
  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>
        <GroupFormContainer>
          <Box maxWidth={"50%"}>
            <Input name="name" label={"Nome do grupo"} />
          </Box>
          <Box display={"flex"} columnGap={"20px"}>
            <Box flex={1} display={"flex"} flexDirection={"column"} rowGap={2}>
              <Input
                name="user_search"
                label={"Buscar usuários"}
                icon={{ right: <Search /> }}
                onChange={({ target }) => {
                  debounceName(target.value);
                }}
              />
              <Typography>Usuarios</Typography>
              <UsersList ref={userListRef} onScrollCapture={paginateTrigger}>
                {usersToList.map((user) => (
                  <UsersListItem
                    onClick={() => addUser(user)}
                    added={!!addedUsers.find((added) => added.id === user.id)}
                  >
                    <AccountCircle color="primary" sx={{ fontSize: "36px" }} />
                    <Typography>{user.name}</Typography>
                  </UsersListItem>
                ))}
              </UsersList>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <SwapHorizontalCircle color="primary" sx={{ fontSize: "56px" }} />
            </Box>
            <Box flex={1} display={"flex"} flexDirection={"column"} rowGap={2}>
              <Input
                name="users"
                label={"Buscar participantes"}
                icon={{ right: <Search /> }}
                onChange={({ target }) => {
                  setAddedName(target.value);
                }}
              />
              <Typography>Participantes</Typography>
              <UsersList>
                {addedUsers
                  .filter((user) => RegExp(addedName, "gmi").test(user.name))
                  .map((user, index) => (
                    <UsersListItem onClick={() => removeUser(index)}>
                      <AccountCircle
                        color="primary"
                        sx={{ fontSize: "36px" }}
                      />
                      <Typography>{user.name}</Typography>
                    </UsersListItem>
                  ))}
              </UsersList>
            </Box>
          </Box>
          <Box>
            <Button type="submit" variant="contained">
              Salvar
            </Button>
          </Box>
        </GroupFormContainer>
      </form>
    </FormProvider>
  );
}

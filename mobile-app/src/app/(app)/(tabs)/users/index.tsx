import { FlatList } from "@/components/Lists";
import { useFollow, useUser } from "@/services";
import { useMutation, useQuery } from "react-query";
import { Skeleton } from "@/components/Loading";
import { useContext, useEffect, useState } from "react";
import { ListCounter, RefreshControl } from "@/components";
import { GlobalContext } from "@/contexts/GlobalContext";
import IUser from "@/types/User";
import { UserCard } from "@/components/Cards";
import { useNotifier, useRefetchOnFocus } from "@/hooks";

export default function Users() {
  const { openNotification } = useNotifier();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [users, setUsers] = useState<IUser[]>([]);
  const { searchFilter } = useContext(GlobalContext)!;

  useEffect(() => {
    setPage(1);
  }, [searchFilter]);

  const { getUsers } = useUser();
  const { followUser, unfollowUser } = useFollow();

  const followMutation = useMutation(followUser);
  const unfollowMutation = useMutation(unfollowUser);

  const usersQuery = useQuery(
    ["users", page, searchFilter],
    () =>
      getUsers({
        page,
        limit: 10,
        name: searchFilter,
      }),
    {
      onSuccess(response) {
        if (page === 1) {
          setTotalPages(response.totalPages);
        }

        setUsers((users) => (page === 1 ? response.items : [...users, ...response.items]));
      },
    },
  );

  useRefetchOnFocus(() => {
    if (page !== 1) {
      setPage(2);
    } else {
      usersQuery.refetch();
    }
  });

  function toggleFollowUser(user: IUser, index: number) {
    if (user.followed) {
      unfollowMutation.mutate(user.id, {
        onSuccess() {
          setUsers((users) => {
            const newUsers = [...users];
            newUsers[index].followed = false;
            return newUsers;
          });
        },
        onError(error: any) {
          openNotification({ status: "error", message: error.message });
        },
      });
    } else {
      followMutation.mutate(user.id, {
        onSuccess() {
          setUsers((users) => {
            const newUsers = [...users];
            newUsers[index].followed = true;
            return newUsers;
          });
        },
        onError(error: any) {
          openNotification({ status: "error", message: error.message });
        },
      });
    }
  }

  return (
    <>
      <ListCounter
        title="Usuários encontrados..."
        count={users.length}
        total={usersQuery.data?.totalItems ?? 0}
      />
      <FlatList
        data={users}
        loading={usersQuery.isFetching}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <UserCard
            name={item.name}
            userName={item.user_name}
            isFollowing={item.followed}
            image={item.photo_url}
            onPress={() => {}}
            onFollow={() => toggleFollowUser(item, index)}
          />
        )}
        emptyMessage="Nenhum livro encontrado."
        ListFooterComponent={<Skeleton template="user-card" quantity={10} />}
        refreshControl={
          <RefreshControl
            refreshing={usersQuery.isRefetching}
            onRefresh={() => {
              if (page !== 1) {
                setPage(1);
              } else {
                usersQuery.refetch();
              }
            }}
          />
        }
        onEndReached={() => {
          const hasPagesToLoad = totalPages > page;

          if (hasPagesToLoad && !usersQuery.isFetching && !usersQuery.error) {
            setPage((page) => page + 1);
          }
        }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 96,
          rowGap: 16,
        }}
        ListFooterComponentStyle={{
          rowGap: 16,
        }}
      />
    </>
  );
}

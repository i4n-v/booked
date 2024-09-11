import { useState, useContext, Fragment } from "react";
import { useUser, useFollow, useBook, useCategory } from "@/services";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { router, useLocalSearchParams } from "expo-router";
import User from "@/components/Icons/User";
import {
  InsightData,
  Insight,
  InsightTitle,
  Insights,
  ProfileContainer,
  UserContainer,
  UserPhoto,
  Divider,
  PhotoContainer,
  FilterTitle,
} from "./styles";
import Security from "@/components/Icons/Security";
import { Account, Follow, Logout } from "@/components/Icons";
import { AuthContext } from "@/contexts/AuthContext";
import { UserHeader } from "@/components/Navigation/Headers";
import { MainButton } from "@/components/Buttons";
import { useTheme } from "styled-components/native";
import { ReadMore, RefreshControl } from "@/components";
import { BookCard } from "@/components/Cards";
import { FlatList } from "@/components/Lists";
import IBook from "@/types/Book";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { useBottomSheet, useDebounce, useNotifier, useRefetchOnFocus } from "@/hooks";
import { format } from "date-fns";
import { cleanUpMask } from "@/utils/mask";
import { Skeleton } from "@/components/Loading";
import { GlobalContext } from "@/contexts/GlobalContext";
import FilterButton from "@/components/Buttons/FilterButton";
import { BottomSheet, BottomSheetMenu } from "@/components/BottomSheets";
import {
  DateField,
  PaginatedAutocompleteField,
  SwitchField,
  TextField,
} from "@/components/FormFields";
import { fieldsRegex } from "@/config/regex";
import BooksFilter from "@/components/Book/BooksFilter";

const validations = z.object({
  min_date: z.date().nullable(),
  max_date: z.date().nullable(),
  free: z.boolean(),
  min_price: z.string().nullable(),
  max_price: z.string().nullable(),
  categories: z.array(z.string()),
});

type IBookFilters = z.infer<typeof validations>;

const Profile = () => {
  const theme = useTheme();
  const { openNotification } = useNotifier();
  const { userId } = useLocalSearchParams();
  const { loading } = useContext(GlobalContext)!;
  const { handleLogout, user } = useContext(AuthContext)!;
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [books, setBooks] = useState<IBook[]>([]);
  const [refFilter, handleOpenFilter] = useBottomSheet();
  const [refSettings, handleOpenSettings, handleCloseSettings] = useBottomSheet();

  const filterForm = useForm<IBookFilters>({
    defaultValues: {
      min_date: null,
      max_date: null,
      free: false,
      min_price: null,
      max_price: null,
      categories: [],
    },
  });

  const filters = useWatch({ control: filterForm.control });
  const debouncedFilters = useDebounce(filters);

  const queryClient = useQueryClient();
  const { getUser } = useUser();
  const { getBooks } = useBook();
  const { getCategories } = useCategory();
  const { followUser, unfollowUser } = useFollow();

  const followMutation = useMutation(followUser);
  const unfollowMutation = useMutation(unfollowUser);

  const userQueryKey = ["user", userId];

  const { data: userData, ...userQuery } = useQuery(
    userQueryKey,
    () => {
      loading({ isLoading: true });
      return getUser(userId as string);
    },
    {
      enabled: !!userId,
      onError(error: any) {
        router.back();
        openNotification({ status: "error", message: error.message });
      },
      onSettled() {
        loading({ isLoading: false });
      },
    },
  );

  const booksQuery = useQuery(
    ["books", userId, page, debouncedFilters],
    () => {
      let params = {
        page,
        limit: 10,
        user_id: userId,
        min_date: debouncedFilters.min_date
          ? format(debouncedFilters.min_date, "yyyy-MM-dd")
          : null,
        max_date: debouncedFilters.max_date
          ? format(debouncedFilters.max_date, "yyyy-MM-dd")
          : null,
        free: debouncedFilters.free,
        min_price: debouncedFilters.min_price
          ? Number(cleanUpMask(debouncedFilters.min_price, "", ["R$", " "]).replace(",", "."))
          : null,
        max_price: debouncedFilters.max_price
          ? Number(cleanUpMask(debouncedFilters.max_price, "", ["R$", " "]).replace(",", "."))
          : null,
        categories: debouncedFilters.categories,
      };

      return getBooks(params);
    },
    {
      enabled: !!userId,
      onSuccess(response) {
        if (page === 1) {
          setTotalPages(response.totalPages);
        }

        setBooks((books) => (page === 1 ? response.items : [...books, ...response.items]));
      },
    },
  );

  function toggleFollowUser() {
    if (!userData) return;

    if (userData.followed) {
      unfollowMutation.mutate(userData.id, {
        onSuccess() {
          const newUser = {
            ...userData,
            followed: false,
          };
          queryClient.setQueryData(userQueryKey, newUser);
        },
        onError(error: any) {
          openNotification({ status: "error", message: error.message });
        },
      });
    } else {
      followMutation.mutate(userData.id, {
        onSuccess() {
          const newUser = {
            ...userData,
            followed: true,
          };
          queryClient.setQueryData(userQueryKey, newUser);
        },
        onError(error: any) {
          openNotification({ status: "error", message: error.message });
        },
      });
    }
  }

  useRefetchOnFocus(() => {
    userQuery.refetch();

    if (page !== 1) {
      setPage(1);
    } else {
      booksQuery.refetch();
    }
  });

  if (!userData) return null;

  const settings = [
    {
      text: "Conta",
      icon: (
        <User
          style={{
            marginLeft: -5,
            marginRight: 5,
          }}
        />
      ),
      onPress: () => {
        handleCloseSettings();
        router.navigate("/settings/account");
      },
    },
    {
      text: "Segurança",
      icon: <Security />,
      onPress: () => {
        handleCloseSettings();
        router.navigate("/settings/security");
      },
    },
    {
      text: "Sair",
      icon: <Logout />,
      onPress: () => {
        handleCloseSettings();
        handleLogout();
      },
    },
  ];

  const insights = [
    {
      title: "Seguidores",
      data: userData.total_followers,
    },
    {
      title: "Livros",
      data: userData.total_books,
    },
    {
      title: "Biblioteca",
      data: userData.total_acquitions,
    },
  ];

  return (
    <>
      <UserHeader data={userData} onPress={handleOpenSettings} />
      <BooksFilter
        refFilter={refFilter}
        filterFormControl={filterForm.control}
        setValue={filterForm.setValue}
        handleOpenFilter={handleOpenFilter}
      />
      <BottomSheetMenu<any> ref={refSettings} items={settings} />
      <FlatList
        data={books}
        loading={booksQuery.isFetching}
        numColumns={2}
        ListHeaderComponent={() => {
          return (
            <ProfileContainer>
              <UserContainer>
                <PhotoContainer>
                  {userData.photo_url ? (
                    <UserPhoto source={{ uri: userData.photo_url }} />
                  ) : (
                    <Account width={60} height={60} />
                  )}
                  {userData.id !== user?.id && (
                    <MainButton<any>
                      rightIcon={{
                        icon: (
                          <Follow
                            width={18}
                            height={18}
                            color={userData.followed ? theme.colors.secondary?.[0] : ""}
                          />
                        ),
                      }}
                      variant={userData.followed ? "contained" : "outlined"}
                      colorScheme={userData.followed ? undefined : "primary"}
                      style={{
                        width: userData.followed ? 110 : 84,
                        height: 32,
                      }}
                      textStyle={{ textTransform: "none" }}
                      gradientStyle={{
                        gap: 2,
                      }}
                      onPress={toggleFollowUser}
                    >
                      {userData.followed ? "Seguindo" : "Seguir"}
                    </MainButton>
                  )}
                </PhotoContainer>
                <Insights>
                  {insights.map((insight, index, array) => {
                    const isLastIndex = index === array.length - 1;

                    return (
                      <Fragment key={insight.title}>
                        <Insight>
                          <InsightData>{insight.data}</InsightData>
                          <InsightTitle>{insight.title}</InsightTitle>
                        </Insight>
                        {!isLastIndex && <Divider />}
                      </Fragment>
                    );
                  })}
                </Insights>
              </UserContainer>
              <ReadMore numberOfLines={3}>{userData.description}</ReadMore>
            </ProfileContainer>
          );
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookCard
            title={item.name}
            author={item.user.name}
            image={item.photo_url}
            wished={item.wished}
            price={item.price}
            rating={item.rating}
            ratingQuantity={item.total_users_rating}
            onPress={() => {
              router.navigate({ pathname: "/books/[id]", params: { id: item.id } });
            }}
          />
        )}
        emptyMessage="Nenhum livro publicado."
        ListFooterComponent={<Skeleton template="book-card" quantity={10} />}
        refreshControl={
          <RefreshControl
            refreshing={booksQuery.isRefetching}
            onRefresh={() => {
              if (page !== 1) {
                setPage(1);
              } else {
                booksQuery.refetch();
              }
            }}
          />
        }
        onEndReached={() => {
          const hasPagesToLoad = totalPages > page;

          if (hasPagesToLoad && !booksQuery.isFetching && !booksQuery.error) {
            setPage((page) => page + 1);
          }
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 96,
          rowGap: 16,
        }}
        ListFooterComponentStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          rowGap: 16,
        }}
      />
    </>
  );
};

export default Profile;

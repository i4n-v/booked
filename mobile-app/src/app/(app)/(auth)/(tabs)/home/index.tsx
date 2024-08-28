import { BookCard } from "@/components/Cards";
import { Detail, Divider, SkeletonContainer, Title } from "./styles";
import { FlatList } from "@/components/Lists";
import { useBook } from "@/services";
import { useQuery } from "react-query";
import { Skeleton } from "@/components/Loading";
import { useState } from "react";
import { EmptyComponent, RefreshControl } from "@/components";
import { Dimensions, SectionList } from "react-native";
import IBook from "@/types/Book";

const screenWidth = Dimensions.get("window").width;

function Home() {
  const [page, setPage] = useState<number>(2);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [books, setBooks] = useState<IBook[]>([]);

  const { getBooks } = useBook();

  const topTenBooksQuery = useQuery("top-ten-books", () => getBooks({ page: 1, limit: 10 }));

  const booksQuery = useQuery(["books", page], () => getBooks({ page, limit: 10 }), {
    onSuccess(response) {
      if (page === 2) {
        setTotalPages(response.totalPages);
      }

      setBooks((books) => (page === 2 ? response.items : [...books, ...response.items]));
    },
  });

  const sections = [
    {
      data: [],
      horizontal: true,
    },
    {
      data: books,
      horizontal: false,
    },
  ];

  return (
    <SectionList
      sections={sections}
      renderSectionHeader={({ section }) => {
        if (!section.horizontal) return null;

        return (
          <>
            <Title>
              Top <Detail>10</Detail> bem avaliados
            </Title>
            <FlatList
              data={topTenBooksQuery.data?.items ?? []}
              loading={topTenBooksQuery.isFetching}
              horizontal
              showsHorizontalScrollIndicator={false}
              ListFooterComponent={<Skeleton template="book-card" quantity={10} />}
              renderItem={({ item }) => (
                <BookCard
                  title={item.name}
                  author={item.user.name}
                  image={item.photo_url}
                  wished={item.wished}
                  price={item.price}
                  rating={item.rating}
                  ratingQuantity={item.total_users_rating}
                />
              )}
              keyExtractor={(item) => item.id}
              style={{
                maxHeight: 288,
              }}
              contentContainerStyle={{
                gap: 16,
              }}
              ListFooterComponentStyle={{
                flexDirection: "row",
                gap: 16,
              }}
            />
            <Divider />
          </>
        );
      }}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <BookCard
            title={item.name}
            author={item.user.name}
            image={item.photo_url}
            wished={item.wished}
            price={item.price}
            rating={item.rating}
            ratingQuantity={item.total_users_rating}
            onPress={() => {}}
          />
        );
      }}
      renderSectionFooter={({ section }) => {
        if (section.horizontal) return null;

        if (booksQuery.isFetching && !booksQuery.isRefetching) {
          return (
            <SkeletonContainer>
              <Skeleton template="book-card" quantity={4} />
            </SkeletonContainer>
          );
        }

        if (totalPages < page) {
          return (
            <EmptyComponent
              style={{ width: screenWidth }}
              emptyMessage="Nenhum livro encontrado."
            />
          );
        }

        return null;
      }}
      refreshControl={
        <RefreshControl
          refreshing={booksQuery.isRefetching}
          onRefresh={() => {
            topTenBooksQuery.refetch();

            if (page !== 2) {
              setPage(2);
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
      contentContainerStyle={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 16,
        paddingHorizontal: 16,
        paddingBottom: 96,
      }}
    />
  );
}

export default Home;

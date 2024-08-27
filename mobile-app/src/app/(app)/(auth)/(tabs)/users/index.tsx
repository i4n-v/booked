import { BookCard } from "@/components/Cards";
import { FlatList } from "@/components/Lists";
import { useBook } from "@/services";
import { useQuery } from "react-query";
import { Skeleton } from "@/components/Loading";
import { useState } from "react";
import { ListCounter, RefreshControl } from "@/components";
import IBook from "@/types/Book";

export default function Users() {
  // const [page, setPage] = useState<number>(1);
  // const [totalPages, setTotalPages] = useState<number>(1);
  // const [books, setBooks] = useState<IBook[]>([]);

  // const { getBooks } = useBook();

  // const booksQuery = useQuery(["books", page], () => getBooks({ page, limit: 10 }), {
  //   onSuccess(response) {
  //     if (page === 1) {
  //       setTotalPages(response.totalPages);
  //     }

  //     setBooks((books) => (page === 1 ? response.items : [...books, ...response.items]));
  //   },
  // });

  return (
    <>
      <ListCounter title="Usuários encontrados..." page={1} limit={10} total={0} />
      {/* <FlatList
        data={books}
        loading={booksQuery.isFetching}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookCard
            title={item.name}
            author={item.user.name}
            // image={item.photo_url}
            wished={item.wished}
            price={item.price}
            rating={item.rating}
            ratingQuantity={item.total_users_rating}
          />
        )}
        emptyMessage="Nenhum livro encontrado."
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
          gap: 16,
        }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 96,
          gap: 16,
        }}
        ListFooterComponentStyle={{
          gap: 16,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      /> */}
    </>
  );
}

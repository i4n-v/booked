import { BookCard } from "@/components/Cards";
import { FlatList } from "@/components/Lists";
import { useBook } from "@/services";
import { useQuery } from "react-query";
import { Skeleton } from "@/components/Loading";
import { useContext, useEffect, useState } from "react";
import { ListCounter, RefreshControl } from "@/components";
import IBook from "@/types/Book";
import { GlobalContext } from "@/contexts/GlobalContext";
import { useBottomSheet, useDebounce, useRefetchOnFocus } from "@/hooks";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { cleanUpMask } from "@/utils/mask";
import { router } from "expo-router";
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

export default function Books() {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [books, setBooks] = useState<IBook[]>([]);
  const { searchFilter, setSearchFilter } = useContext(GlobalContext)!;
  const [refFilter, handleOpenFilter] = useBottomSheet();

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

  useEffect(() => {
    setPage(1);
  }, [debouncedFilters, searchFilter]);

  const { getBooks } = useBook();

  const booksQuery = useQuery(
    ["books", page, searchFilter, debouncedFilters],
    () => {
      let params = {
        page,
        limit: 10,
        search: searchFilter,
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
      onSuccess(response) {
        if (page === 1) {
          setTotalPages(response.totalPages);
        }

        setBooks((books) => (page === 1 ? response.items : [...books, ...response.items]));
      },
    },
  );

  useRefetchOnFocus(() => {
    if (page !== 1) {
      setPage(1);
    } else {
      booksQuery.refetch();
    }
  });

  return (
    <>
      <BooksFilter
        refFilter={refFilter}
        filterFormControl={filterForm.control}
        setValue={filterForm.setValue}
        handleOpenFilter={handleOpenFilter}
      />
      <ListCounter
        title="Livros encontrados..."
        count={books.length}
        total={booksQuery.data?.totalItems ?? 0}
      />
      <FlatList
        data={books}
        loading={booksQuery.isFetching}
        numColumns={2}
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
              setSearchFilter(null);
              router.navigate({ pathname: "/books/[id]", params: { id: item.id } });
            }}
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
}

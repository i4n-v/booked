import TabNavigation from "@/components/Navigation/TabNavigation";
import { useMemo, useState } from "react";
import { useQueries } from "react-query";
import { useAcquisitions, useWishe } from "@/services";
import IBook from "@/types/Book";
import { IWrapper } from "@/types/Wrapper";
import { IAcquisitions } from "@/types/Acquisitions";
import { FlatList } from "@/components/Lists";
import { BookCard } from "@/components/Cards";
import { router } from "expo-router";
import { Skeleton } from "@/components/Loading";
import { ListCounter, RefreshControl } from "@/components";
import BooksFilter from "@/components/Book/BooksFilter";
import { useBottomSheet, useDebounce } from "@/hooks";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { cleanUpMask } from "@/utils/mask";
import { LibraryTypes } from "./types";

const validations = z.object({
  min_date: z.date().nullable(),
  max_date: z.date().nullable(),
  free: z.boolean(),
  min_price: z.string().nullable(),
  max_price: z.string().nullable(),
  categories: z.array(z.string()),
});

type IBookFilters = z.infer<typeof validations>;

function Library() {
  const [type, setType] = useState<keyof typeof LibraryTypes>("acquisition");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [books, setBooks] = useState<IBook[]>([]);
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

  const { getAcquisitions } = useAcquisitions();
  const { getWishes } = useWishe();

  const filters = useWatch({ control: filterForm.control });
  const debouncedFilters = useDebounce(filters);

  const mountParams = () => {
    let params = {
      page,
      limit: 10,
      min_date: debouncedFilters.min_date ? format(debouncedFilters.min_date, "yyyy-MM-dd") : null,
      max_date: debouncedFilters.max_date ? format(debouncedFilters.max_date, "yyyy-MM-dd") : null,
      free: debouncedFilters.free,
      min_price: debouncedFilters.min_price
        ? Number(cleanUpMask(debouncedFilters.min_price, "", ["R$", " "]).replace(",", "."))
        : null,
      max_price: debouncedFilters.max_price
        ? Number(cleanUpMask(debouncedFilters.max_price, "", ["R$", " "]).replace(",", "."))
        : null,
      categories: debouncedFilters.categories,
    };

    return params;
  };

  const booksQueries = useQueries([
    {
      queryKey: ["get-wishes-books", debouncedFilters, page],
      queryFn: () => getWishes(mountParams()),
      enabled: type === "wishes",
      onSuccess: (data: IWrapper<IBook>) => {
        console.log(data);

        if (page === 1) {
          setTotalPages(data.totalPages);
        }

        setBooks((books) => (page === 1 ? data.items : [...books, ...data.items]));
      },
    },
    {
      queryKey: ["get-acquisition-books", debouncedFilters],
      queryFn: () => getAcquisitions(mountParams()),
      enabled: type === "acquisition",
      onSuccess: (data: IWrapper<IAcquisitions>) => {
        if (page === 1) {
          setTotalPages(data.totalPages);
        }

        setBooks((books) => (page === 1 ? data.items : [...books, ...data.items]));
      },
    },
  ]);

  const handleSelectTab = (tab: string) => {
    const type: keyof typeof LibraryTypes =
      tab === LibraryTypes.acquisition ? "acquisition" : "wishes";
    setBooks([]);
    setType(type);
    setPage(1);
    filterForm.reset();
  };

  const queryIndex = useMemo(() => {
    return type === "wishes" ? 0 : 1;
  }, [type]);

  return (
    <>
      <TabNavigation
        selectedTab={type as string}
        uppercase
        onSelectTab={(value) => handleSelectTab(value)}
        tabs={["Biblioteca", "favoritos"]}
      />
      <BooksFilter
        refFilter={refFilter}
        handleOpenFilter={handleOpenFilter}
        filterFormControl={filterForm.control}
        setValue={filterForm.setValue}
        removePriceFilter={type === "acquisition"}
      />
      <ListCounter
        count={books.length}
        total={!booksQueries[queryIndex].isFetching ? booksQueries[queryIndex].data?.totalItems! : 0}
      />

      <FlatList
        data={books}
        loading={booksQueries[queryIndex].isFetching}
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
              setPage(1);
              router.navigate({ pathname: "/books/[id]", params: { id: item.id } });
            }}
          />
        )}
        emptyMessage="Nenhum livro encontrado."
        ListFooterComponent={<Skeleton template="book-card" quantity={10} />}
        refreshControl={
          <RefreshControl
            refreshing={booksQueries[queryIndex].isRefetching}
            onRefresh={() => {
              if (page !== 1) {
                setPage(1);
              } else {
                booksQueries[queryIndex].refetch();
              }
            }}
          />
        }
        onEndReached={() => {
          const hasPagesToLoad = totalPages > page;

          if (
            hasPagesToLoad &&
            !booksQueries[queryIndex].isFetching &&
            !booksQueries[queryIndex].error
          ) {
            setPage(page + 1);
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

export default Library;

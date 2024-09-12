import { PDFViewer } from "@/components";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useContext, useLayoutEffect } from "react";
import { useAcquisitions, useBook } from "@/services";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { GlobalContext } from "@/contexts/GlobalContext";
import { useNotifier } from "@/hooks";
import { AuthContext } from "@/contexts/AuthContext";

export default function PDF() {
  const navigation = useNavigation();
  const { openNotification } = useNotifier();
  const { bookId } = useLocalSearchParams();
  const { loading } = useContext(GlobalContext)!;
  const { user } = useContext(AuthContext)!;

  const queryClient = useQueryClient();
  const { getBook } = useBook();
  const { updateAcquisition } = useAcquisitions();

  const updateAcquisitionMutation = useMutation(updateAcquisition);

  const bookQueryKey = ["book", bookId];

  const { data: book } = useQuery(
    bookQueryKey,
    () => {
      loading({ isLoading: true });
      return getBook(bookId as string);
    },
    {
      onError(error: any) {
        router.back();
        openNotification({ status: "error", message: error.message });
      },
      onSettled() {
        loading({ isLoading: false });
      },
    },
  );

  function handleMarkPage(page: number) {
    const newPage = book?.marked_page === page ? null : page;

    updateAcquisitionMutation.mutate(
      {
        id: book?.acquisition_id!,
        data: {
          marked_page: newPage,
        },
      },
      {
        onSuccess() {
          queryClient.setQueryData(bookQueryKey, { ...book, marked_page: newPage });
        },
        onError(error: any) {
          openNotification({ status: "error", message: error.message });
        },
      },
    );
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: book?.name,
    });
  }, [navigation, book]);

  if (!book) return;

  const isAcquired = !!book.acquisition_id || book.user.id === user?.id;

  return (
    <PDFViewer
      url={book.file_url ?? undefined}
      maxPages={isAcquired ? undefined : 10}
      initialPage={book.marked_page ?? 1}
      markedPage={book.marked_page}
      onMarkPage={handleMarkPage}
      showMarkPage={isAcquired}
    />
  );
}

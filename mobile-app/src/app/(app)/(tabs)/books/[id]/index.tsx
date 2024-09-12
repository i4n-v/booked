import { router, useLocalSearchParams } from "expo-router";
import React, { useContext, useRef, useState } from "react";
import {
  About,
  AuhtorInfoContainer,
  Author,
  BookImage,
  ButtonContainer,
  CommentForm,
  CommentOwner,
  CommentsTitle,
  Divider,
  RatingContainer,
  RatingDescribe,
  Tag,
  TagContainer,
  Title,
  WishContainer,
  Wrapper,
} from "./styles";
import { useAcquisitions, useAssessment, useBook, useComment, useWishe } from "@/services";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { IBookParams } from "./types";
import { useBottomSheet, useNotifier } from "@/hooks";
import { RatingField, TextField } from "@/components/FormFields";
import { useForm } from "react-hook-form";
import { IconButton, MainButton } from "@/components/Buttons";
import toBRL from "@/utils/toBRL";
import { ReadMore } from "@/components";
import { Favorite, FavoriteOutlined, Send } from "@/components/Icons";
import { GlobalContext } from "@/contexts/GlobalContext";
import { Alert } from "@/components/Dialogs";
import { AuthContext } from "@/contexts/AuthContext";
import { BottomSheetList } from "@/components/BottomSheets";
import { CommentCard } from "@/components/Cards";
import { IComment } from "@/types/Comment";
import { Skeleton } from "@/components/Loading";
import { IStatusTypes } from "@/components/Dialogs/Alert/types";
import { useTheme } from "styled-components/native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const unknownPhoto = require("@/../assets/images/unknown-photo.jpg");

const commentFormValidations = z
  .object({
    comment: z.string({
      required_error: "",
    }),
  })
  .required();

type ICommentForm = z.infer<typeof commentFormValidations>;

export default function BookView() {
  const theme = useTheme();
  const { openNotification } = useNotifier();
  const { user } = useContext(AuthContext)!;
  const { loading } = useContext(GlobalContext)!;
  const firstRender = useRef(true);
  const [status, setStatus] = useState<IStatusTypes>(null);
  const { id } = useLocalSearchParams<IBookParams>();
  const [refComments, openComments] = useBottomSheet();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentToEdit, setcommentToEdit] = useState<IComment | null>(null);
  const [commentToResponse, setcommentToResponse] = useState<IComment | null>(null);

  const ratingForm = useForm({
    defaultValues: { rating: 0 },
  });

  const commentForm = useForm<ICommentForm>({
    defaultValues: { comment: "" },
    resolver: zodResolver(commentFormValidations),
  });

  const bookQueryKey = ["books", id];
  const queryClient = useQueryClient();
  const { getBook } = useBook();
  const { createWishe, deleteWishe } = useWishe();
  const { postAssessment, putAssessment } = useAssessment();
  const { createAcquisition } = useAcquisitions();
  const { getComments, createComment, deleteComment, updateComment } = useComment();

  const createWisheMutation = useMutation(createWishe);
  const deleteWisheMutation = useMutation(deleteWishe);
  const postAssessmentMutation = useMutation(postAssessment);
  const putAssessmentMutation = useMutation(putAssessment);
  const createAcquisitionMutation = useMutation(createAcquisition);
  const createCommentMutation = useMutation(createComment);
  const deleteCommentMutation = useMutation(deleteComment);
  const updateCommentMutation = useMutation(updateComment);

  const { data: book, ...bookQuery } = useQuery(
    bookQueryKey,
    () => {
      if (firstRender.current) {
        loading({ isLoading: true });
      }

      return getBook(id);
    },
    {
      onSuccess(response) {
        const rating = response.user_raters?.[0];

        if (firstRender.current && rating) {
          ratingForm.setValue("rating", rating.assessment.number);
        }

        firstRender.current = false;
      },
      onError(error: any) {
        router.back();
        openNotification({ status: "error", message: error.message });
      },
      onSettled() {
        firstRender.current = false;
        loading({ isLoading: false });
      },
    },
  );

  const commentsQuery = useQuery(
    ["comments", id],
    () => getComments({ book_id: id, page: 1, limit: 15 }),
    {
      enabled: false,
      onSuccess(response) {
        if (page === 1) {
          setTotalPages(response.totalPages);
        }

        setComments((comments) => (page === 1 ? response.items : [...comments, ...response.items]));
      },
    },
  );

  function toggleWish() {
    if (book?.wished) {
      return deleteWisheMutation.mutate(id, {
        onSuccess(response) {
          const newBook = { ...book, wished: false };
          queryClient.setQueryData(bookQueryKey, newBook);
        },
        onError(error: any) {
          openNotification({ status: "error", message: error.message });
        },
      });
    }

    createWisheMutation.mutate(id, {
      onSuccess() {
        const newBook = { ...book, wished: true };
        queryClient.setQueryData(bookQueryKey, newBook);
      },
      onError(error: any) {
        openNotification({ status: "error", message: error.message });
      },
    });
  }

  function evaluateBook(value: number) {
    if (!book) return;

    const assessmentId = book.user_raters?.[0]?.assessment.id;

    if (assessmentId) {
      return putAssessmentMutation.mutate(
        { number: value, id: assessmentId },
        {
          onSuccess: () => {
            bookQuery.refetch();
          },
          onError: (error: any) => {
            openNotification({ status: "error", message: error.message });
          },
        },
      );
    }

    postAssessmentMutation.mutate(
      { number: value, book_id: book.id },
      {
        onSuccess: () => {
          bookQuery.refetch();
        },
        onError: (error: any) => {
          openNotification({ status: "error", message: error.message });
        },
      },
    );
  }

  function acquireBook() {
    createAcquisitionMutation.mutate(book?.id!, {
      onSuccess() {
        setStatus("success");
        bookQuery.refetch();
      },
      onError(error: any) {
        openNotification({ status: "error", message: error.message });
      },
    });
  }

  const onSubmitComment = commentForm.handleSubmit((values) => {
    if (commentToEdit) {
      return updateCommentMutation.mutate(
        { comment_id: commentToEdit.id, description: values.comment },
        {
          onSuccess(response) {
            setComments([]);
            setPage(1);
            commentsQuery.refetch();
            commentForm.reset();
            openNotification({ status: "success", message: response.message });
          },
          onError(error: any) {
            openNotification({ status: "error", message: error.message });
          },
        },
      );
    }

    const data: IComment<"CREATE"> & IComment<"RESPONSE"> = {
      description: values.comment,
    };

    if (commentToResponse) {
      data.comment_id = commentToResponse.id;
      data.description = data.description
        .replace(`@${commentToResponse.user.user_name}`, "")
        .trim();
    } else {
      data.book_id = id;
    }

    createCommentMutation.mutate(data, {
      onSuccess(response) {
        if (commentToResponse) {
          setcommentToResponse(null);
        }

        setComments([]);
        setPage(1);
        commentsQuery.refetch();
        commentForm.reset();

        const newBook = { ...book, total_comments: book!.total_comments + 1 };
        queryClient.setQueryData(bookQueryKey, newBook);

        openNotification({ status: "success", message: response.message });
      },
      onError(error: any) {
        openNotification({ status: "error", message: error.message });
      },
    });
  });

  function handleDeleteComment(data: IComment) {
    deleteCommentMutation.mutate(data.id, {
      onSuccess(response) {
        setComments([]);
        setPage(1);
        commentsQuery.refetch();
        commentForm.reset();

        const newBook = { ...book, total_comments: book!.total_comments - 1 };
        queryClient.setQueryData(bookQueryKey, newBook);

        openNotification({ status: "success", message: response.message });
      },
      onError(error: any) {
        openNotification({ status: "error", message: error.message });
      },
    });
  }

  function handleEditComment(data: IComment) {
    setcommentToEdit(data);
    commentForm.setValue("comment", data.description);
  }

  function handleResponseComment(data: IComment) {
    setcommentToResponse(data);
    commentForm.setValue("comment", `@${data.user.user_name} `);
  }

  function handleOpenComments() {
    openComments();
    commentsQuery.refetch();
  }

  function handleCloseComments() {
    setPage(1);
    setTotalPages(0);
    setComments([]);
  }

  function navigateToRead() {
    router.navigate({
      pathname: "/pdf/[bookId]",
      params: {
        bookId: book!.id,
      },
    });
  }

  if (!book) return null;

  const statusTypes = {
    error: {
      title: "Solicitação",
      message: `Você realmente deseja solicitar a compra do *${book.name}* ?`,
      hasActions: true,
    },
    success: {
      title: "Solicitação concluída!",
      message: `Sua solicitação de compra foi criada e informada ao vendedor, onde você poderá alinhar o *pagamento* do livro via *chat*. Sua solicitação pode ser *cancelada* na tela de solictações.`,
      hasActions: false,
    },
  };

  return (
    <Wrapper>
      <BottomSheetList
        ref={refComments}
        snapPoints={["90%"]}
        onClose={handleCloseComments}
        flatListProps={{
          data: comments,
          loading: commentsQuery.isFetching,
          ListFooterComponent: () => <Skeleton template="comment-card" quantity={15} />,
          ListHeaderComponent: () => <CommentsTitle>Comentários</CommentsTitle>,
          stickyHeaderIndices: [0],
          keyExtractor: (item) => item.id,
          renderItem: ({ item }) => (
            <CommentCard
              data={item}
              onDelete={handleDeleteComment}
              onEdit={handleEditComment}
              onResponse={handleResponseComment}
            />
          ),
          onEndReached: () => {
            const hasPagesToLoad = totalPages > page;

            if (hasPagesToLoad && !commentsQuery.isFetching && !commentsQuery.error) {
              setPage((page) => page + 1);
              commentsQuery.refetch();
            }
          },
          emptyMessage: "Nenhum comentário encontrado",
          contentContainerStyle: { padding: 16, gap: 12 },
          ListFooterComponentStyle: { gap: 12 },
        }}
        FooterComponent={() => (
          <CommentForm>
            <TextField<any>
              name="comment"
              control={commentForm.control}
              customOnChange={(value) => {
                if (commentToResponse) {
                  const compare = `@${commentToResponse.user.user_name}`;

                  if (!value.includes(compare)) {
                    commentForm.reset();
                    setcommentToResponse(null);
                  }
                }
              }}
              containerProps={{
                style: {
                  flex: 1,
                },
              }}
            />
            <MainButton
              style={{
                height: 46,
                width: 70,
              }}
              loading={createCommentMutation.isLoading || updateCommentMutation.isLoading}
              onPress={onSubmitComment}
            >
              <Send width={22} height={22} color={theme.colors.secondary?.[0]} />
            </MainButton>
          </CommentForm>
        )}
      />
      <Alert
        open={!!status}
        onClose={() => setStatus(null)}
        onConfirm={acquireBook}
        title="Solicitação"
        status={status!}
        message={statusTypes[status!]?.message}
        hasActions={statusTypes[status!]?.hasActions}
      />
      <WishContainer>
        <AuhtorInfoContainer>
          <Title>{book.name}</Title>
          <Author>{book.user.name}</Author>
        </AuhtorInfoContainer>
        <IconButton<any>
          icon={book.wished ? <Favorite /> : <FavoriteOutlined />}
          onPress={toggleWish}
        />
      </WishContainer>
      {!book.photo_url ? (
        <BookImage source={{ uri: book.photo_url }} />
      ) : (
        <BookImage source={unknownPhoto} />
      )}
      <TagContainer>
        {book.categories.map((category) => (
          <Tag key={category.id}>{category.name}</Tag>
        ))}
      </TagContainer>
      <RatingContainer>
        <RatingField name="rating" control={ratingForm.control} customOnChange={evaluateBook} />
        <RatingDescribe>
          ({book.rating} de {book.total_users_rating} avaliações)
        </RatingDescribe>
      </RatingContainer>
      <ButtonContainer>
        {book.acquisition_id || book.user.id === user?.id ? (
          <MainButton onPress={navigateToRead}>Começar leitura</MainButton>
        ) : (
          <>
            <MainButton disabled={!!book.solicitation_id} onPress={() => setStatus("error")}>
              {book.solicitation_id
                ? "Solicitação pendente"
                : book.free
                  ? "Gratuito"
                  : `Comprar por R$ ${toBRL(book.price)}`}
            </MainButton>
            {!book.free && (
              <MainButton variant="outlined" colorScheme="primary" onPress={navigateToRead}>
                Ler amostra gratuíta
              </MainButton>
            )}
          </>
        )}
      </ButtonContainer>
      <Divider />
      <About>Sobre o livro</About>
      <ReadMore>{book.description}</ReadMore>
      <Divider />
      <MainButton variant="outlined" colorScheme="primary" onPress={handleOpenComments}>
        Comentários ({book.total_comments})
      </MainButton>
    </Wrapper>
  );
}

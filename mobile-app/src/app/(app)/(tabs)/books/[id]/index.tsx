import { router, useLocalSearchParams } from "expo-router";
import React, { useContext, useRef, useState } from "react";
import {
  About,
  AuhtorInfoContainer,
  Author,
  BookImage,
  ButtonContainer,
  Divider,
  RatingContainer,
  RatingDescribe,
  Tag,
  TagContainer,
  Title,
  WishContainer,
  Wrapper,
} from "./styles";
import { useAcquisitions, useAssessment, useBook, useWishe } from "@/services";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { IBookParams } from "./types";
import { useNotifier } from "@/hooks";
import { RatingField } from "@/components/FormFields";
import { useForm } from "react-hook-form";
import { IconButton, MainButton } from "@/components/Buttons";
import toBRL from "@/utils/toBRL";
import { ReadMore } from "@/components";
import { Favorite, FavoriteOutlined } from "@/components/Icons";
import { GlobalContext } from "@/contexts/GlobalContext";
import { Alert } from "@/components/Dialogs";
import { AuthContext } from "@/contexts/AuthContext";

const unknownPhoto = require("@/../assets/images/unknown-photo.jpg");

export default function BookView() {
  const { openNotification } = useNotifier();
  const { user } = useContext(AuthContext)!;
  const { loading } = useContext(GlobalContext)!;
  const firstRender = useRef(true);
  const [confirm, setConfirm] = useState(false);
  const { id } = useLocalSearchParams<IBookParams>();

  const ratingForm = useForm({
    defaultValues: { rating: 0 },
  });

  const bookQueryKey = ["books", id];
  const queryClient = useQueryClient();
  const { getBook } = useBook();
  const { createWishe, deleteWishe } = useWishe();
  const { postAssessment, putAssessment } = useAssessment();
  const { createAcquisition } = useAcquisitions();

  const createWisheMutation = useMutation(createWishe);
  const deleteWisheMutation = useMutation(deleteWishe);
  const postAssessmentMutation = useMutation(postAssessment);
  const putAssessmentMutation = useMutation(putAssessment);
  const createAcquisitionMutation = useMutation(createAcquisition);

  const { data: book, ...bookQuery } = useQuery(
    bookQueryKey,
    () => {
      if (firstRender.current) {
        firstRender.current = false;
        loading({ isLoading: true });
      }

      return getBook(id);
    },
    {
      onSuccess(response) {
        ratingForm.setValue("rating", response.rating);
      },
      onError(error: any) {
        router.back();
        openNotification({ status: "error", message: error.message });
      },
      onSettled() {
        loading({ isLoading: false });
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
      onSuccess(response) {
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
            const newBook = {
              ...book,
              rating: value,
            };
            queryClient.setQueryData(bookQueryKey, newBook);
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
      onSuccess(response) {
        bookQuery.refetch();
        openNotification({ status: "success", message: response.message });
      },
      onError(error: any) {
        openNotification({ status: "error", message: error.message });
      },
    });
  }

  if (!book) return null;

  return (
    <Wrapper>
      <Alert
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={acquireBook}
        title="Solicitação"
        message={`Você realmente deseja solicitar a compra do *${book.name}* ?`}
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
          <MainButton>Começar leitura</MainButton>
        ) : (
          <>
            <MainButton onPress={() => setConfirm(true)}>
              {book.free ? "Gratuito" : `Comprar por R$ ${toBRL(book.price)}`}
            </MainButton>
            {!book.free && (
              <MainButton variant="outlined" colorScheme="primary">
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
      <MainButton variant="outlined" colorScheme="primary">
        Comentários ({book.total_comments})
      </MainButton>
    </Wrapper>
  );
}

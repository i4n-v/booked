import { Account } from "@/components/Icons";
import styled from "./styled";
import { BookCard } from "@/components/Cards";
import { router } from "expo-router";
import { Image, View } from "react-native";
import { MessageProps } from "./types";

export default function Message({
  mine,
  books,
  content,
  photo_url,
  id,
  onPressImage,
}: MessageProps) {
  return (
    <styled.Container mine={mine}>
      {!mine && <Account />}
      <styled.Content mine={mine}>
        {photo_url ? (
          <styled.MessageImageContainer onPress={onPressImage}>
            <styled.MessageImage source={{ uri: photo_url }} resizeMode="cover" />
          </styled.MessageImageContainer>
        ) : books.length ? (
          <styled.BooksContainer>
            {books.map((book, index) => (
              <BookCard
                title={book.name}
                author={book.user.name}
                ratingQuantity={book.total_users_rating}
                image={book.photo_url}
                rating={book.rating}
                key={`${book.id}-${id}-${index}`}
                price={book.price}
                wished={book.wished}
                onPress={() => {
                  router.push({ pathname: "/books/[id]", params: { id: book.id } });
                }}
              />
            ))}
          </styled.BooksContainer>
        ) : (
          content
        )}
      </styled.Content>
    </styled.Container>
  );
}

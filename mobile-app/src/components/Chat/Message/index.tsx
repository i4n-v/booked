import { Account } from "@/components/Icons";
import styled from "./styled";
import { IMessage } from "@/types/Message";
import { BookCard } from "@/components/Cards";
import { router } from "expo-router";
import { GestureResponderEvent, Image, ImageBackground, StyleSheet, Text, View } from "react-native";
interface MessageProps extends IMessage {
  onPressImage: (((event: GestureResponderEvent) => void) & (() => void)) | undefined
}
export default function Message({ mine, books, content, photo_url, id,onPressImage }: MessageProps) {
  return (
    <styled.Container mine={mine}>
      {!mine && <Account />}
      <styled.Content mine={mine}>
        {photo_url ? (
          <styled.MessageImage onPress={onPressImage}>
            <Image
              source={{ uri: photo_url }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </styled.MessageImage>
        ) : books.length ? (
          books.map((book, index) => (
            <BookCard
              title={book.name}
              author={book.user.name}
              ratingQuantity={book.total_users_rating}
              image={book.photo_url}
              onPress={() => router.navigate("/(app)/(tabs)/books")}
              rating={book.rating}
              key={id}
              price={book.price}
              wished={book.wished}
            />
          ))
        ) : (
          content
        )}
      </styled.Content>
    </styled.Container>
  );
}

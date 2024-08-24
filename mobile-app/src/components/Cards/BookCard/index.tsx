import React from "react";
import { BookCardProps } from "./types";
import {
  Author,
  BookImage,
  CardContainer,
  InfoContainer,
  Rating,
  RatingContainer,
  Spacing,
  Tag,
  Title,
} from "./styles";
import { useForm } from "react-hook-form";
import { RatingField } from "@/components/FormFields";
import toBRL from "@/utils/toBRL";
import { Favorite } from "@/components/Icons";
import { useTheme } from "styled-components/native";

const unknownPhoto = require("../../../../assets/images/unknown-photo.jpg");

export default function BookCard({
  title,
  author,
  price,
  wished,
  rating,
  ratingQuantity,
  image,
  onPress,
  style,
}: BookCardProps) {
  const theme = useTheme();

  const { control } = useForm({
    defaultValues: { rating },
  });

  return (
    <CardContainer onPress={onPress} activeOpacity={theme.shape.opacity} style={style}>
      {image ? <BookImage source={{ uri: image }} /> : <BookImage source={unknownPhoto} />}
      <InfoContainer>
        <Title numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Title>
        <Author numberOfLines={1} ellipsizeMode="tail">
          {author}
        </Author>
        <RatingContainer>
          <RatingField name="rating" control={control} size={24}></RatingField>
          <Rating>({ratingQuantity})</Rating>
        </RatingContainer>
        <Spacing>
          <Tag>
            {parseInt(price as unknown as string)
              ? toBRL(parseInt(price as unknown as string))
              : "Gratuito"}
          </Tag>
          {wished && <Favorite width={24} height={24} />}
        </Spacing>
      </InfoContainer>
    </CardContainer>
  );
}

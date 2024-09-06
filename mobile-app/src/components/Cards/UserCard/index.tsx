import React from "react";
import { UserCardProps } from "./types";
import {
  AuthorName,
  CardContainer,
  InfoContainer,
  UserContainer,
  UserName,
  UserPhoto,
} from "./styles";
import { Account, Follow } from "@/components/Icons";
import { useTheme } from "styled-components/native";
import { IconButton } from "@/components/Buttons";

export default function BookCard({
  name,
  userName,
  image,
  isFollowing,
  onPress,
  onFollow,
}: UserCardProps) {
  const theme = useTheme();

  return (
    <CardContainer onPress={onPress} activeOpacity={theme.shape.opacity}>
      <UserContainer>
        {image ? <UserPhoto source={{ uri: image }} /> : <Account width={42} height={42} />}
        <InfoContainer>
          <AuthorName numberOfLines={1} ellipsizeMode="tail">
            {name}
          </AuthorName>
          <UserName numberOfLines={1} ellipsizeMode="tail">
            {userName}
          </UserName>
        </InfoContainer>
      </UserContainer>
      <IconButton<any>
        icon={<Follow color={isFollowing ? "" : theme.colors.secondary?.[400]} />}
        onPress={() => {
          if (onFollow instanceof Function) {
            onFollow();
          }
        }}
      ></IconButton>
    </CardContainer>
  );
}

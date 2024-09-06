import React from "react";
import {
  AuthorName,
  IconBone,
  ImageBone,
  InfoContainer,
  SkeletonContainer,
  UserContainer,
  UserName,
} from "./style";

export default function SkeletonUserCard() {
  return (
    <SkeletonContainer>
      <UserContainer>
        <ImageBone />
        <InfoContainer>
          <AuthorName />
          <UserName />
        </InfoContainer>
      </UserContainer>
      <IconBone />
    </SkeletonContainer>
  );
}

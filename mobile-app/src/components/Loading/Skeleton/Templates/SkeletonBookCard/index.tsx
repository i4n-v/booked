import React from "react";
import {
  AuthorBone,
  ImageBone,
  InfoContainer,
  PriceBone,
  RatingBone,
  SkeletonContainer,
  TitleBone,
} from "./style";

export default function SkeletonBookCard() {
  return (
    <SkeletonContainer>
      <ImageBone />
      <InfoContainer>
        <TitleBone />
        <AuthorBone />
        <RatingBone />
        <PriceBone />
      </InfoContainer>
    </SkeletonContainer>
  );
}

import React from "react";
import { Comment, CommentContainer, ImageBone, SkeletonContainer, UserName } from "./style";

export default function SkeletonCommentCard() {
  return (
    <SkeletonContainer>
      <ImageBone />
      <CommentContainer>
        <UserName />
        <Comment />
      </CommentContainer>
    </SkeletonContainer>
  );
}

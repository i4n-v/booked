import React from "react";
import { MessageBone, MessageContentStyle, SkeletonContainer } from "./style";


export default function SkeletonMessage() {
    const randomSize = () => Math.floor(Math.random() * (300 - 100 + 1)) + 200

  return (
    <SkeletonContainer>
        <MessageContentStyle mine >
            <MessageBone size={randomSize()}/>
        </MessageContentStyle>
        <MessageContentStyle >
            <MessageBone size={randomSize()}/>
        </MessageContentStyle>
    </SkeletonContainer>
  );
}

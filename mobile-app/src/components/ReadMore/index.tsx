import React, { PropsWithChildren, useState } from "react";
import { NativeSyntheticEvent, TextLayoutEventData } from "react-native";
import { useTheme } from "styled-components/native";
import { BookDescription, ReadMoreContainer, ReadMoreAction, Wrapper } from "./styles";
import { ArrowDown, ArrowUp } from "../Icons";
import { IReadMoreProps } from "./types";

export default function ReadMore({ children, numberOfLines = 5 }: IReadMoreProps) {
  const theme = useTheme();
  const [hasMoreToShow, setHasMoreToShow] = useState(false);
  const [showMore, setShoreMore] = useState(false);

  function verifyIfHasMoreToShow(event: NativeSyntheticEvent<TextLayoutEventData>) {
    const hasMoreToShow = event.nativeEvent.lines.length > numberOfLines;
    setHasMoreToShow(hasMoreToShow);
  }

  function toggleShowMore() {
    setShoreMore((showMore) => !showMore);
  }

  return (
    <Wrapper>
      <BookDescription
        numberOfLines={showMore ? undefined : numberOfLines}
        ellipsizeMode="tail"
        onTextLayout={verifyIfHasMoreToShow}
      >
        {children}
      </BookDescription>
      <ReadMoreContainer activeOpacity={theme.shape.opacity} onPress={toggleShowMore}>
        {hasMoreToShow && (
          <>
            {showMore ? <ArrowUp width={18} height={8} /> : <ArrowDown width={18} height={8} />}
            <ReadMoreAction>{showMore ? "Mostrar menos" : "Mostrar mais"}</ReadMoreAction>
          </>
        )}
      </ReadMoreContainer>
    </Wrapper>
  );
}

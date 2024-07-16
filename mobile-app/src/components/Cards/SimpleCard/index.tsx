import React from "react";
import { ICardProps } from "./types";
import {
  Container,
  HeadContainer,
  LabelTitle,
  Subtitle,
  TagText,
  TagsContainer,
  Title,
} from "./styles";
import { View } from "react-native";

export default function SimpleCard({
  title,
  subtitle,
  labelTitle,
  icon,
  tags,
  containerStyle,
  children,
  main,
}: ICardProps) {
  return (
    <Container style={containerStyle} main={main}>
      <HeadContainer>
        <View>
          {labelTitle && <LabelTitle>{labelTitle}</LabelTitle>}
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </View>
        {icon && <View>{icon}</View>}
      </HeadContainer>
      {children && <View>{children}</View>}
      {tags?.length && (
        <TagsContainer>
          {tags.map((tag) => (
            <TagText key={tag}>{tag}</TagText>
          ))}
        </TagsContainer>
      )}
    </Container>
  );
}

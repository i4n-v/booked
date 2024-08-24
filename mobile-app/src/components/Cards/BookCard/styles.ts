import styled, { css } from "styled-components/native";

const CardContainer = styled.TouchableOpacity`
  width: 191px;
  height: 285px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.secondary?.[0]};
  ${({ theme }) => theme.shadows[0] as any}
`;

const BookImage = styled.Image`
  width: 191px;
  height: 140px;
  border-radius: 8px 8px 0 0;
`;

const InfoContainer = styled.View`
  padding: 8px;
`;

const DescriptionStyles = css`
  font-family: ${({ theme }) => theme.typography.fonts.primary.normal};
  font-size: ${({ theme }) => theme.typography.size.xs + "px"};
  max-width: 100%;
`;

const Title = styled.Text`
  ${DescriptionStyles}
  color: ${({ theme }) => theme.colors.text?.[1000]};
  margin-bottom: 6px;
`;

const Author = styled.Text`
  ${DescriptionStyles}
  color: ${({ theme }) => theme.colors.text?.[700]};
  margin-bottom: 12px;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 2px;
  margin-bottom: 12px;
`;

const Rating = styled.Text`
  ${DescriptionStyles}
  color: ${({ theme }) => theme.colors.text?.[500]};
`;

const Spacing = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Tag = styled.Text`
  ${DescriptionStyles}
  color: ${({ theme }) => theme.colors.text?.[0]};
  background-color: ${({ theme }) => theme.colors.primary?.[200]};
  border-radius: 6px;
  padding: 6px 12px;
  align-self: flex-start;
`;

export {
  CardContainer,
  BookImage,
  InfoContainer,
  Title,
  Author,
  RatingContainer,
  Rating,
  Spacing,
  Tag,
};

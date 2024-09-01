import styled from "styled-components/native";

const Wrapper = styled.ScrollView`
  padding: 16px 16px 96px 16px;
`;

const WishContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const AuhtorInfoContainer = styled.View`
  gap: 6px;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.normal};
  font-size: ${({ theme }) => theme.typography.size.sm + "px"};
  color: ${({ theme }) => theme.colors.secondary?.[1000]};
`;

const Author = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.normal};
  font-size: ${({ theme }) => theme.typography.size.xs + "px"};
  color: ${({ theme }) => theme.colors.secondary?.[700]};
`;

const BookImage = styled.Image`
  height: 260px;
  width: 100%;
  border-radius: 8px;
  ${({ theme }) => theme.shadows[0] as any};
`;

const TagContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0 8px 0;
`;

const Tag = styled.Text`
  padding: 6px 12px;
  border-radius: 4px;
  font-family: ${({ theme }) => theme.typography.fonts.primary.normal};
  font-size: ${({ theme }) => theme.typography.size.xxs + "px"};
  color: ${({ theme }) => theme.colors.secondary?.[0]};
  background-color: ${({ theme }) => theme.colors.primary?.[200]};
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
  margin-bottom: 20px;
`;

const RatingDescribe = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.normal};
  font-size: ${({ theme }) => theme.typography.size.xs + "px"};
  color: ${({ theme }) => theme.colors.secondary?.[700]};
`;

const ButtonContainer = styled.View`
  gap: 12px;
`;

const Divider = styled.View`
  width: 100%;
  height: 1px;
  margin: 20px -16px;
  background-color: ${({ theme }) => theme.colors.secondary?.[200]};
`;

const About = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.normal};
  font-size: ${({ theme }) => theme.typography.size.xs + "px"};
  color: ${({ theme }) => theme.colors.secondary?.[1000]};
  margin-bottom: 8px;
  `;

export {
  Wrapper,
  WishContainer,
  AuhtorInfoContainer,
  Title,
  Author,
  BookImage,
  TagContainer,
  Tag,
  RatingContainer,
  RatingDescribe,
  ButtonContainer,
  Divider,
  About,
};

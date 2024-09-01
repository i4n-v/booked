import styled from "styled-components/native";

const Wrapper = styled.View`
  gap: 6px;
`;

const BookDescription = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.normal};
  font-size: ${({ theme }) => theme.typography.size.xxs + "px"};
  color: ${({ theme }) => theme.colors.secondary?.[700]};
`;

const ReadMoreContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const ReadMoreAction = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.normal};
  font-size: ${({ theme }) => theme.typography.size.xxs + "px"};
  color: ${({ theme }) => theme.colors.primary?.[200]};
`;

export { BookDescription, ReadMoreContainer, ReadMoreAction, Wrapper };

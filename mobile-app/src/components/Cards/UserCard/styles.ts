import styled, { css } from "styled-components/native";

const CardContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.secondary?.[0]};
  ${({ theme }) => theme.shadows[0] as any}
`;

const UserContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const InfoContainer = styled.View`
  gap: 2px;
`;

const UserPhoto = styled.Image`
  width: 42px;
  height: 42px;
  border-radius: 42px;
`;

const DescriptionStyles = css`
  font-family: ${({ theme }) => theme.typography.fonts.primary.normal};
  max-width: 100%;
`;

const AuthorName = styled.Text`
  ${DescriptionStyles}
  font-size: ${({ theme }) => theme.typography.size.xs + "px"};
  color: ${({ theme }) => theme.colors.secondary?.[1000]};
`;

const UserName = styled.Text`
  ${DescriptionStyles}
  font-size: ${({ theme }) => theme.typography.size.xxs + "px"};
  color: ${({ theme }) => theme.colors.secondary?.[700]};
`;

export { CardContainer, UserContainer, InfoContainer, UserPhoto, AuthorName, UserName };

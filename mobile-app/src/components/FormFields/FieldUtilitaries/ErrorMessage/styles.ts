import styled from "styled-components/native";

const ErrorMessageContainer = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  font-size: ${({ theme }) => theme.typography.size.caption + "px"};
  color: ${({ theme }) => theme.colors.error?.[400]};
`;

export { ErrorMessageContainer };

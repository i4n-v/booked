import styled from "styled-components/native";

const EmptyMessageContainer = styled.Text`
  text-align: center;
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  font-size: ${({ theme }) => theme.typography.size.sm + "px"};
  color: ${({ theme }) => theme.colors.primary?.[200]};
  padding: 12px;
`;

export { EmptyMessageContainer };

import styled from "styled-components/native";

const CounterContainer = styled.View`
  gap: 8px;
  margin: 16px 16px 16px 12px;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  font-size: ${({ theme }) => theme.typography.size.md + "px"};
  color: ${({ theme }) => theme.colors.text?.[1000]};
`;

const Description = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.normal};
  font-size: ${({ theme }) => theme.typography.size.xs + "px"};
  color: ${({ theme }) => theme.colors.text?.[1000]};
  `;

const Detail = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  color: ${({ theme }) => theme.colors.primary?.[200]};
`;

export { CounterContainer, Title, Description, Detail };

import styled from "styled-components/native";

const FilterTitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  font-size: ${({ theme }) => theme.typography.size.xs + "px"};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text?.[1000]};
  margin-bottom: 8px;
`;

export { FilterTitle };

import styled from "styled-components/native";

const Container = styled.View`
  gap: 12px;
`;

const Unorded = styled.View`
  width: 5px;
  height: 5px;
  border-radius: 5px;
  margin-top: 7px;
  background-color: ${({ theme }) => theme.colors.primary?.[200]};
`;

const Orded = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.semibold};
  font-size: ${({ theme }) => theme.typography.size.body + "px"};
  color: ${({ theme }) => theme.colors.secondary?.[700]};
`;

const ItemContainer = styled.View`
    flex-direction: row;
    align-items: flex-start;
    gap: 8px;
`;

const Item = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.normal};
  font-size: ${({ theme }) => theme.typography.size.body + "px"};
  color: ${({ theme }) => theme.colors.secondary?.[600]};
  max-width: 98%;
`;

export { Container, Unorded, Orded, ItemContainer, Item };

import styled from "styled-components/native";

interface IInputOptionContainer {
  selected: boolean;
}

const InputOptionContainer = styled.Pressable<IInputOptionContainer>`
  padding: ${({ theme }) => theme.shape.padding + "px"};
  border-bottom-width: 1px;
  border-style: solid;  
  border-color: ${({ theme }) => theme.colors.secondary?.[200]};
  background-color: ${({ theme, selected }) => (selected ? theme.colors.primary?.[0] : "transparent")};
`;

const InputOptionLabel = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  font-size: ${({ theme }) => theme.typography.size.body + "px"};
  color: ${({ theme }) => theme.colors.secondary?.[600]};
`;

export { InputOptionContainer, InputOptionLabel };

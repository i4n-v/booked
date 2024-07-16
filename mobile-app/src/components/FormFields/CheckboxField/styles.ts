import styled from "styled-components/native";
import { ICheckBoxFieldProps } from "./types";

interface IOptionContainerProps {
  direction: ICheckBoxFieldProps<any>["direction"];
}

interface ICheckBoxInputProps {
  selected: boolean;
  error: boolean;
}

const CheckboxContainer = styled.View`
  row-gap: 6px;
`;

const OptionsContainer = styled.View<IOptionContainerProps>`
  gap: 8px;
  flex-wrap: wrap;
  flex-direction: ${({ direction }) => direction};
`;

const CheckBoxOption = styled.TouchableOpacity`
  column-gap: 6px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  opacity: ${({ theme, disabled }) => (disabled ? theme.shape.opacity : 1)};
`;

const CheckBoxInput = styled.View<ICheckBoxInputProps>`
  padding: 2px;
  border-radius: 4px;
  border-width: 2px;
  border-color: ${({ theme, selected, error }) => {
    if (error) return theme.colors.error?.[400];
    if (selected) return theme.colors.primary?.[200];
    return theme.colors.secondary?.[400];
  }};
  background-color: ${({ theme, selected }) => (selected ? theme.colors.primary?.[200] : "transparent")};
`;

const CheckBoxInputLabel = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  font-size: ${({ theme }) => theme.typography.size.caption + "px"};
  color: ${({ theme }) => theme.colors.secondary?.[600]};
`;

export { CheckboxContainer, OptionsContainer, CheckBoxOption, CheckBoxInput, CheckBoxInputLabel };

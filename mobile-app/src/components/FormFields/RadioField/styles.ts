import { StyleSheet } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { IRadioFieldProps } from "./types";

interface IOptionContainerProps {
  direction: IRadioFieldProps<any>["direction"];
}

interface IRadioInputProps {
  selected: boolean;
  error: boolean;
}

const RadioContainer = styled.View`
  row-gap: 6px;
`;

const OptionsContainer = styled.View<IOptionContainerProps>`
  gap: 8px;
  flex-wrap: wrap;
  flex-direction: ${({ direction }) => direction};
`;

const RadioOption = styled.TouchableOpacity`
  column-gap: 6px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  opacity: ${({ theme, disabled }) => (disabled ? theme.shape.opacity : 1)};
`;

const RadioInput = styled.View<IRadioInputProps>`
  padding: 4px;
  border-radius: 100px;
  border-width: 2px;
  border-color: ${({ theme, selected, error }) => {
    if (error) return theme.colors.error?.[400];
    if (selected) return theme.colors.primary?.[200];
    return theme.colors.secondary?.[400];
  }};
`;

const RadioInputSelection = styled.View<Omit<IRadioInputProps, "error">>`
  padding: 7px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.primary?.[200]};
  opacity: ${({ selected }) => (selected ? 1 : 0)};
`;

const RadioInputLabel = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  font-size: ${({ theme }) => theme.typography.size.caption + "px"};
  color: ${({ theme }) => theme.colors.secondary?.[600]};
`;

export {
  RadioContainer,
  OptionsContainer,
  RadioOption,
  RadioInput,
  RadioInputSelection,
  RadioInputLabel,
};

import { StyleSheet } from "react-native";
import styled, { useTheme } from "styled-components/native";

interface ISwitchSlideProps {
  error: boolean;
}

const SwitchContainer = styled.View`
  row-gap: 6px;
  padding: 0 4px;
`;

const LabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 6px;
`;

const SwitchInput = styled.Pressable`
  position: relative;
  width: 48px;
  height: 18px;
  border-radius: 100px;
  border-width: 1.5px;
`;

const SwitchSlide = styled.View<ISwitchSlideProps>`
  position: absolute;
  top: -6;
  width: 26px;
  height: 26px;
  border-radius: 100px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme, error }) => (error ? theme.colors.error?.[400] : theme.colors.secondary?.[300])};
  background-color: ${({ theme }) => theme.colors.secondary?.[0]};
  box-shadow: ${({ theme }) => theme.shadows[2].web};
`;

export { SwitchContainer, LabelContainer, SwitchInput, SwitchSlide };

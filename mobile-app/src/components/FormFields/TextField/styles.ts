import styled from "styled-components/native";
import { ITextFieldProps } from "./types";
import { IconButton } from "@/components/Buttons";

const InputContainer = styled.View`
  row-gap: 6px;
  position: relative;
`;

interface ITextInputProps
  extends Pick<ITextFieldProps, "leftIcon" | "rightIcon" | "password" | "textArea"> {
  focused: boolean;
  error: boolean;
}

const TextInput = styled.TextInput<ITextInputProps>`
  height: ${({ textArea, numberOfLines }) => {
    if (!textArea) return "64px";

    const initialHeight = 20;
    const height = numberOfLines ? numberOfLines * initialHeight : 10 * initialHeight;

    return height + "px";
  }};
  padding: ${({ textArea }) => (textArea ? "12px" : "0 12px")};
  padding-left: ${({ leftIcon }) => (leftIcon ? "46px" : "12px")};
  padding-right: ${({ rightIcon }) => (rightIcon ? "46px" : "12px")};
  border-width: 1.5px;
  border-color: ${({ theme, focused, error }) => {
    if (error) return theme.colors.error?.[400];

    if (focused) return theme.colors.primary?.[200];

    return theme.colors.secondary?.[300];
  }};
  border-radius: ${({ theme }) => theme.shape.borderRadius + "px"};
  color: ${({ theme }) => theme.colors.text?.[600]};
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  background-color: ${({ theme }) => theme.colors.secondary?.[100]};
  opacity: ${({ theme, editable }) => (editable ? theme.shape.opacity : 1)};
`;

interface IInputIconProps {
  error: boolean;
  direction: "left" | "right";
}

const InputIconButton = styled(IconButton)<IInputIconProps>`
  position: absolute;
  right: ${({ direction }) => (direction === "right" ? "6px" : "initial")};
  left: ${({ direction }) => (direction === "left" ? "6px" : "initial")};
  bottom: ${({ error }) => (error ? "34px" : "17px")};
`;

export { InputContainer, TextInput, InputIconButton };

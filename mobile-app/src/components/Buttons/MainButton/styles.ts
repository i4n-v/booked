import styled from "styled-components/native";
import { IMainButtonProps } from "./types";

type IButtonContainerProps = Pick<IMainButtonProps<any>, "variant" | "colorScheme">;

interface IButtonLabel {
  color?: string;
}

const ButtonContainer = styled.TouchableOpacity<IButtonContainerProps>`
  border-radius: ${({ theme }) => theme.shape.borderRadius + "px"};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 8px;
  padding: ${({ theme }) => "0 " + theme.shape.padding + "px"};
  height: 64px;
  width: "100%";
  background-color: ${({ theme, variant, colorScheme }) => {
    if (variant === "outlined") return "transparent";
    if (colorScheme) return theme.colors[colorScheme]?.[500];
    return theme.colors.primary?.[200];
  }};
  border-width: ${({ variant }) => (variant === "outlined" ? "1px" : "0px")};
  border-style: solid;
  border-color: ${({ theme, colorScheme }) => (colorScheme ? theme.colors[colorScheme]?.[500] : theme.colors.secondary?.[400])};
  box-shadow: ${({ theme, variant }) => (variant !== "outlined" ? theme.shadows[1].web : "none")};
  opacity: ${({ theme, disabled }) => (disabled ? theme.shape.opacity + "px" : 1)}; 
`;

const ButtonLabel = styled.Text<IButtonLabel>`
  font-size: ${({ theme }) => theme.typography.size.body + "px"};
  font-family: ${({ theme }) => theme.typography.fonts.primary.semibold};
  text-transform: uppercase;
  color: ${({ color }) => color}
`;

export { ButtonContainer, ButtonLabel };

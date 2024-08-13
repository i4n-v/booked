import styled from "styled-components/native";
import { IMainButtonProps } from "./types";
import { LinearGradient } from "expo-linear-gradient";

type IButtonContainerProps = Pick<IMainButtonProps<any>, "variant" | "colorScheme">;

interface IButtonLabel {
  color?: string;
}

const ButtonContainer = styled.TouchableOpacity<IButtonContainerProps>`
  border-radius: 4px;
  height: 64px;
  width: "100%";
  border-width: ${({ variant }) => (variant === "outlined" ? "1px" : "0px")};
  border-style: solid;
  border-color: ${({ theme, colorScheme }) => (colorScheme ? theme.colors[colorScheme]?.[500] : theme.colors.secondary?.[700])};
  opacity: ${({ theme, disabled }) => (disabled ? theme.shape.opacity + "px" : 1)};
  ${({ theme, variant }) => (variant !== "outlined" ? (theme.shadows[0] as any) : "")};
  `;

const ButtonGradient = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => "0 " + theme.shape.padding + "px"};
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 8px;
`;

const ButtonLabel = styled.Text<IButtonLabel>`
  font-size: ${({ theme }) => theme.typography.size.xs + "px"};
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  text-transform: uppercase;
  color: ${({ color }) => color};
`;

export { ButtonContainer, ButtonLabel, ButtonGradient };

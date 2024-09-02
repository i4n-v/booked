import { useTheme } from "styled-components/native";
import { IFilterButtonProps } from "./types";
import { ButtonContainer, ButtonGradient } from "./styles";
import { Filter } from "@/components/Icons";

export default function FilterButton({ onPress }: IFilterButtonProps) {
  const theme = useTheme();

  return (
    <ButtonContainer onPress={onPress} activeOpacity={theme.shape.opacity}>
      <ButtonGradient colors={[theme.colors.primary?.[200]!, theme.colors.primary?.[400]!]}>
        <Filter />
      </ButtonGradient>
    </ButtonContainer>
  );
}

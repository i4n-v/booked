import { useTheme } from "styled-components/native";
import { IFilterButtonProps } from "./types";
import { ButtonGradient } from "./styles";
import { Filter } from "@/components/Icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function FilterButton({ onPress }: IFilterButtonProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={theme.shape.opacity}>
      <ButtonGradient colors={[theme.colors.primary?.[200]!, theme.colors.primary?.[400]!]}>
        <Filter />
      </ButtonGradient>
    </TouchableOpacity>
  );
}

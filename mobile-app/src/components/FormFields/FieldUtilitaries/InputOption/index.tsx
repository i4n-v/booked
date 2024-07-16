import { IInputOption } from "./types";
import { InputOptionContainer, InputOptionLabel } from "./styles";

export default function InputOption({ selected, children, onPress }: IInputOption) {
  return (
    <InputOptionContainer selected={selected} onPress={onPress}>
      <InputOptionLabel>{children}</InputOptionLabel>
    </InputOptionContainer>
  );
}

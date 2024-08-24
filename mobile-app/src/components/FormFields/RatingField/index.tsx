import React from "react";
import { InputContainer, RatingContainer } from "./styles";
import { OutlinedStar, Star, StarHalf } from "@/components/Icons";
import { useController } from "react-hook-form";
import { ErrorMessage, Label } from "../FieldUtilitaries";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IRatingFieldProps } from "./types";
import { useTheme } from "styled-components";

export default function RatingField({
  name,
  control,
  label,
  size = 32,
  required,
  disabled,
  containerProps,
  customOnChange,
}: IRatingFieldProps) {
  const theme = useTheme();

  const {
    field,
    formState: { errors },
  } = useController({ name, control });
  const error = errors[field.name]?.message as string | undefined;

  function handleChange(value: number) {
    const newValue = value === field.value ? 0 : value;

    field.onChange(newValue);

    if (customOnChange instanceof Function) {
      customOnChange(newValue);
    }
  }

  return (
    <InputContainer {...containerProps}>
      <Label error={!!error} disabled={disabled} required={required}>
        {label}
      </Label>
      <RatingContainer>
        {Array.from({ length: 5 }).map((_, index) => {
          let Icon = OutlinedStar;
          const order = index + 1;

          if (field.value % order < field.value) {
            Icon = Star;
          } else if (field.value % order === field.value && field.value > index) {
            Icon = StarHalf;
          }

          return (
            <TouchableOpacity
              activeOpacity={theme.shape.opacity}
              key={`star-rating-${index}`}
              onPress={() => handleChange(order)}
            >
              <Icon width={size} height={size} />
            </TouchableOpacity>
          );
        })}
      </RatingContainer>
      <ErrorMessage>{error}</ErrorMessage>
    </InputContainer>
  );
}

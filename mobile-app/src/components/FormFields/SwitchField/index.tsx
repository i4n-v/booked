import React, { useEffect } from "react";
import { useController } from "react-hook-form";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "styled-components";
import { LabelContainer, SwitchContainer, SwitchInput, SwitchSlide } from "./styles";
import { ErrorMessage, Label } from "../FieldUtilitaries";
import { ISwitchProps } from "./types";

const AnimatedSwitchInput = Animated.createAnimatedComponent(SwitchInput);
const AnimatedSwitchSlide = Animated.createAnimatedComponent(SwitchSlide);

function SwithcField({
  name,
  value,
  label,
  control,
  required,
  disabled,
  containerProps,
  onChange,
  customOnChange,
}: ISwitchProps) {
  const theme = useTheme();

  const {
    field,
    formState: { errors },
  } = useController({ name, control });
  const error = errors[field.name]?.message as string | undefined;

  const fieldValue: boolean = value !== undefined ? value : field.value;

  const slidePosition = useSharedValue(-2);
  const activeSlide = useSharedValue(0);

  useEffect(() => {
    if (fieldValue) {
      slidePosition.value = 21;
      activeSlide.value = 1;
    }
  }, []);

  const inputAnimatedStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      activeSlide.value,
      [0, 1],
      [theme.colors.secondary[100], theme.colors.primary[200]],
    ),
    borderColor: interpolateColor(
      activeSlide.value,
      [0, 1],
      [theme.colors.secondary[300], theme.colors.primary[200]],
    ),
  }));

  const slideAnimatedStyles = useAnimatedStyle(() => ({
    left: slidePosition.value,
  }));

  function handleChange() {
    const value = !fieldValue;

    if (value) {
      slidePosition.value = withSpring(21);
      activeSlide.value = withTiming(1);
    } else {
      slidePosition.value = withSpring(-2);
      activeSlide.value = withTiming(0);
    }

    if (onChange instanceof Function) {
      onChange(value);
    } else {
      field.onChange(value);

      if (customOnChange instanceof Function) {
        customOnChange(value);
      }
    }
  }

  return (
    <SwitchContainer {...containerProps}>
      <LabelContainer>
        <AnimatedSwitchInput style={inputAnimatedStyles} onPress={handleChange}>
          <AnimatedSwitchSlide error={!!error} style={slideAnimatedStyles} />
        </AnimatedSwitchInput>
        <Label disabled={disabled} required={required} error={!!error}>
          {label}
        </Label>
      </LabelContainer>
      <ErrorMessage>{error}</ErrorMessage>
    </SwitchContainer>
  );
}

export default SwithcField;

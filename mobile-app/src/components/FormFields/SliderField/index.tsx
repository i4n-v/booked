import React, { useCallback, useEffect } from "react";
import { useController } from "react-hook-form";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { FillTrack, Slide, SlideTrack, SliderContainer, SliderLabel } from "./styles";
import { Label, ErrorMessage } from "../FieldUtilitaries";
import { IAnimationContext, ISliderFieldProps } from "./types";

const AnimatedSliderLabel = Animated.createAnimatedComponent(SliderLabel);
const AnimatedFillTrack = Animated.createAnimatedComponent(FillTrack);
const AnimatedSlide = Animated.createAnimatedComponent(Slide);

export default function SliderField({
  name,
  control,
  value,
  label,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  required,
  customOnChange,
  containerProps,
}: ISliderFieldProps) {
  const {
    field,
    formState: { errors },
  } = useController({ name, control });
  const error = errors[field.name]?.message as string | undefined;

  const fieldValue: number = value !== undefined ? value : field.value;

  function handleChange() {
    const value =
      min + Math.round(slideXAxis.value / (maxWidth.value / ((max - min) / step))) * step;

    field.onChange(value);

    if (customOnChange instanceof Function) {
      customOnChange(value);
    }
  }

  const slideXAxis = useSharedValue(0);
  const slideScale = useSharedValue(1);
  const maxWidth = useSharedValue(0);
  const changedBy = useSharedValue("external");

  const calculateX = useCallback((value: number, maxWidth: number) => {
    const relativeValue = (value - min) / (max - min);
    const initialSlideXAxis = relativeValue * maxWidth;
    return initialSlideXAxis;
  }, []);

  useEffect(() => {
    if (fieldValue && changedBy.value === "external" && maxWidth.value) {
      slideXAxis.value = withTiming(calculateX(fieldValue, maxWidth.value));
    }

    changedBy.value = "external";
  }, [fieldValue]);

  const fillTrackAnimatedStyles = useAnimatedStyle(() => ({
    width: slideXAxis.value,
  }));

  const slideAnimatedStyles = useAnimatedStyle(() => ({
    left: slideXAxis.value - 12,
    transform: [
      {
        scale: slideScale.value,
      },
    ],
  }));

  const sliderLabelAnimatedStyles = useAnimatedStyle(() => ({
    left: slideXAxis.value - 21,
    opacity: interpolate(slideScale.value, [1, 1.3], [0, 1]),
  }));

  const slideGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, IAnimationContext>({
    onStart: (_, context) => {
      context.startX = slideXAxis.value;
      slideScale.value = withTiming(1.3);
    },
    onActive: (event, context) => {
      const translationX = context.startX + event.translationX;

      if (translationX >= 0 && translationX <= maxWidth.value) {
        slideXAxis.value = translationX;
      }
    },
    onEnd: () => {
      slideScale.value = withTiming(1);
      changedBy.value = "internal";
      runOnJS(handleChange)();
    },
  });

  const animatedSliderLabelProps = useAnimatedProps<any>(() => {
    const value =
      min + Math.round(slideXAxis.value / (maxWidth.value / ((max - min) / step))) * step;

    return { text: Number.isNaN(value) ? "0" : value.toString() };
  });

  return (
    <SliderContainer {...containerProps}>
      <Label error={!!error} required={required} disabled={disabled}>
        {label}
      </Label>
      <SlideTrack
        onLayout={function (event) {
          const { width } = event.nativeEvent.layout;
          maxWidth.value = width;
          slideXAxis.value = withTiming(calculateX(fieldValue, width));
        }}
      >
        <AnimatedFillTrack style={fillTrackAnimatedStyles} />
        <AnimatedSliderLabel
          editable={false}
          style={sliderLabelAnimatedStyles}
          animatedProps={animatedSliderLabelProps}
        />
        <PanGestureHandler onGestureEvent={slideGesture}>
          <AnimatedSlide style={slideAnimatedStyles} />
        </PanGestureHandler>
      </SlideTrack>
      <ErrorMessage>{error}</ErrorMessage>
    </SliderContainer>
  );
}

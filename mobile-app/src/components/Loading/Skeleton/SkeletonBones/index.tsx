import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import { SekeletonGradient, Skeleton, SkeletonContainer } from "./style";
import { ISkeletonBones } from "./types";

const AnimatedSkeleton = Animated.createAnimatedComponent(Skeleton);

const gradientColors = [
  "rgba(255, 255, 255, 0.1)",
  "rgba(255, 255, 255, 0.5)",
  "rgba(255, 255, 255, 1)",
  "rgba(255, 255, 255, 0.5)",
  "rgba(255, 255, 255, 0.1)",
];

export default function SkeletonBones({ size = 180, style }: ISkeletonBones) {
  const xAxis = useSharedValue(-size / 1.2);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: xAxis.value }],
    };
  });

  useEffect(() => {
    xAxis.value = withRepeat(
      withTiming(size - size / 8, {
        duration: 1000,
      }),
      -1,
    );
  }, [size]);

  return (
    <SkeletonContainer style={[{ width: size }, style]}>
      <AnimatedSkeleton style={animatedStyle}>
        <SekeletonGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
      </AnimatedSkeleton>
    </SkeletonContainer>
  );
}

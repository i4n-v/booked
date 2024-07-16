import React from "react";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { useTheme } from "styled-components/native";

function SpinnerLoading({ ...props }: ActivityIndicatorProps) {
  const theme = useTheme();

  return <ActivityIndicator color={theme.colors.primary?.[200]} size="large" {...props} />;
}

export default SpinnerLoading;

import React from "react";
import { RefreshControl as Refresh, RefreshControlProps } from "react-native";
import { useTheme } from "styled-components";

function RefreshControl({ refreshing, onRefresh, ...props }: RefreshControlProps) {
  const theme = useTheme();

  return (
    <Refresh
      colors={[theme.colors.primary[200]]}
      tintColor={theme.colors.primary[200]}
      refreshing={refreshing}
      onRefresh={onRefresh}
      {...props}
    />
  );
}

export default RefreshControl;

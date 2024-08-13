import React, { useRef } from "react";
import { Container, Selection, TabList } from "./styles";
import { ITabBarProps, ITabBarIcon, ITabRoute } from "./types";
import { TouchableOpacity } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useTheme } from "styled-components/native";

const AnimatedSelection = Animated.createAnimatedComponent(Selection);

export default function TabBar({ state, descriptors, navigation }: ITabBarProps) {
  const theme = useTheme();
  const elementsXaxis = useRef<number[]>([]);
  const xAxis = useSharedValue(0);

  const selectionAnimatedStyles = useAnimatedStyle(() => ({
    left: xAxis.value,
  }));

  function handleNavigate(index: number) {
    const elementPosition = elementsXaxis.current[index];
    xAxis.value = withTiming(elementPosition);
  }

  const onPress = (route: ITabRoute, isFocused: boolean) => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  const onLongPress = (route: ITabRoute) => {
    navigation.emit({
      type: "tabLongPress",
      target: route.key,
    });
  };

  return (
    <Container>
      <TabList>
        {state.routes.map((route, index) => {
          const descriptor = descriptors[route.key];
          const isFocused = state.index === index;
          const Icon: ITabBarIcon = descriptor.options.tabBarIcon;

          if (!Icon) return null;

          return (
            <TouchableOpacity
              activeOpacity={theme.shape.opacity}
              onPress={() => {
                handleNavigate(index);
                onPress(route, isFocused);
              }}
              onLongPress={() => onLongPress(route)}
              onLayout={(event) => {
                const x = event.nativeEvent.layout.x;

                elementsXaxis.current.push(x - 10);

                if (isFocused) {
                  xAxis.value = x - 8;
                }
              }}
            >
              <Icon focused={isFocused} color={theme.colors.primary?.[200]!} size={32} />
            </TouchableOpacity>
          );
        })}
        <AnimatedSelection style={selectionAnimatedStyles} />
      </TabList>
    </Container>
  );
}

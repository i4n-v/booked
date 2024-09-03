import React, { useRef } from "react";
import { TouchableOpacity } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Container, TabList, Selection, Text } from "./styles";
import { useTheme } from "styled-components/native";

const AnimatedSelection = Animated.createAnimatedComponent(Selection);

interface TabNavigationProps {
  selectedTab: string;
  onSelectTab: (tab: string) => void;
  tabs: string[];
}

export default function TabNavigation({ selectedTab, onSelectTab, tabs }: TabNavigationProps) {
  const theme = useTheme();
  const elementsXaxis = useRef<number[]>([]);
  const xAxis = useSharedValue(0);

  const selectionAnimatedStyles = useAnimatedStyle(() => ({
    left: xAxis.value,
  }));

  const handleNavigate = (index: number, tab: string) => {
    const elementPosition = elementsXaxis.current[index];
    xAxis.value = withTiming(elementPosition);
    onSelectTab(tab);
  };

  return (
    <Container>
      <TabList>
        {tabs.map((tab, index) => {
          const isFocused = selectedTab === tab;

          return (
            <TouchableOpacity
              key={tab}
              activeOpacity={theme.shape.opacity}
              onPress={() => handleNavigate(index, tab)}
              onLayout={(event) => {
                const x = event.nativeEvent.layout.x;
                elementsXaxis.current[index] = x - 10;

                if (isFocused) {
                  xAxis.value = x - 10;
                }
              }}
            >
              <Text>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
            </TouchableOpacity>
          );
        })}
        <AnimatedSelection style={[selectionAnimatedStyles]} />
      </TabList>
    </Container>
  );
}

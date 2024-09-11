import React, { useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Container, TabList, Selection, Text, Dot } from "./styles";
import { useTheme } from "styled-components/native";

const AnimatedSelection = Animated.createAnimatedComponent(Selection);

interface TabNavigationProps {
  selectedTab: string;
  onSelectTab: (tab: string) => void;
  tabs: any[];
  uppercase: boolean;
}

export default function TabNavigation({ selectedTab, onSelectTab, tabs,uppercase }: TabNavigationProps) {
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
        {tabs.map((tab, index, all) => {
          const isFocused = selectedTab === tab;
          const isLast = index === all.length - 1;
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
              <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
                <Text>{ uppercase ? tab.toUpperCase() : tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
                {!isLast && <Dot />}
              </View>
            </TouchableOpacity>
          );
        })}
        <AnimatedSelection style={[selectionAnimatedStyles]} />
      </TabList>
    </Container>
  );
}

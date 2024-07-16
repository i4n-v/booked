import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ICardAccordion } from "./types";
import {
  CardContainer,
  Container,
  ContainerTextIcon,
  ContentCard,
  Subtitle,
  Title,
} from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, {
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const CardAccordion: React.FC<ICardAccordion> = ({
  title, // title of header component (required)
  subtitle, // subtitle of header component (optional)
  icon, // icon of header component (react node) (optional)
  expanded = false, // expanded state (optional)
  children, // children (react node) (required)
  contentCard, // contentCard (react node) - between header and children (optional)
}: ICardAccordion) => {
  const theme = useTheme();
  const open = useSharedValue(expanded);
  const progress = useDerivedValue(() => (open.value ? withTiming(0) : withTiming(1)));
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * -180}deg` }],
  }));
  const listRef = useAnimatedRef<Animated.View>();
  const heightValue = useSharedValue(0);

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));

  React.useEffect(() => {
    if (!!open.value && heightValue.value === 0) {
      runOnUI(() => {
        "worklet";
        heightValue.value = withTiming(measure(listRef)!.height);
      })();
    }
  }, [open]);

  return (
    <Container>
      <CardContainer>
        <ContainerTextIcon>
          <View>
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
            <Title>{title}</Title>
          </View>
          {icon && <View>{icon}</View>}
        </ContainerTextIcon>
        {!!contentCard && <ContentCard>{contentCard}</ContentCard>}
        <TouchableOpacity
          onPress={() => {
            if (heightValue.value === 0) {
              runOnUI(() => {
                "worklet";
                heightValue.value = withTiming(measure(listRef)!.height);
              })();
            } else {
              heightValue.value = withTiming(0);
            }
            open.value = !open.value;
          }}
        >
          <View>
            <Animated.View style={iconStyle}>
              <MaterialIcons name="keyboard-arrow-up" color={theme.colors.text?.[500]} size={48} />
            </Animated.View>
          </View>
        </TouchableOpacity>
      </CardContainer>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View
          style={{
            position: "absolute",
            width: "100%",
            top: 0,
            padding: 12,
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
            backgroundColor: theme.colors.secondary?.[0],
          }}
          ref={listRef}
        >
          {children}
        </Animated.View>
      </Animated.View>
    </Container>
  );
};

export default CardAccordion;

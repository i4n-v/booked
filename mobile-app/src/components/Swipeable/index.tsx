import React, { useMemo, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { Alert } from "../Dialogs";
import accessObjectByString from "@/utils/accessObjectByString";
import Icon from "../Icon";
import { ActionsContainer, IconContainer, SwipeableContainer } from "./styles";
import { ActionAlert, ICustomSwipleableActions, ISwipeableProps } from "./types";
import { ExpoVectorIcon } from "@/types/ExpoVectorIcons";

const AnimatedSwipeableContainer = Animated.createAnimatedComponent(SwipeableContainer);

function Swipeable<T extends Record<string, any>, I extends ExpoVectorIcon>({
  data,
  actions,
  customActions,
  disabledActions,
  itemKeyExtractor,
  confirmMessage = "Você realmente deseja *action* este item?",
  children,
}: ISwipeableProps<T, I>) {
  const theme = useTheme();
  const actionAlert = useRef<ActionAlert | null>(null);
  const [open, setOpen] = useState(false);

  const swipeSize = useMemo(
    () => (actions.length >= 1 ? 80 + 95 * (actions.length - 1) : 200),
    [actions],
  );

  const swipeActions: ICustomSwipleableActions<ExpoVectorIcon> = useMemo(
    () => ({
      more: {
        title: "mais",
        name: "more-vert",
        icon: MaterialIcons,
        color: theme.colors.primary[200],
      },
      delete: {
        title: "deletar",
        name: "delete",
        icon: MaterialIcons,
        color: theme.colors.error[500],
        confirm: true,
      },
      suspend: {
        title: "suspender",
        name: "block-helper",
        icon: MaterialCommunityIcons,
        color: theme.colors.warning[500],
        confirm: true,
      },
      edit: {
        title: "editar",
        name: "edit",
        icon: MaterialIcons,
        color: theme.colors.primary[200],
      },
      ...customActions,
    }),
    [],
  );

  function togleOpen() {
    setOpen((open) => !open);
  }

  function handleMessage(row: T, action: string) {
    const message = confirmMessage.replace("action", action);
    const splitedMessage = message.split(" ").map((str) => {
      if (str.match(/({\D+})/gi)) {
        const replacer = str.replace(/[()?]/g, "");
        const value = accessObjectByString(row, replacer.replace(/[{}]/g, "").replace("row.", ""));
        const string = str.replace(replacer, value);
        return string;
      }

      return str;
    });

    const completedMessage = splitedMessage.join(" ");

    return completedMessage;
  }

  const actionItems = (data: T) => (
    <ActionsContainer>
      {actions.map((action, index, array) => {
        const disabled = disabledActions ? disabledActions(data, action.name) : false;

        return (
          <TouchableOpacity
            key={`${action.name}-${
              itemKeyExtractor ? accessObjectByString(data, itemKeyExtractor) : index
            }`}
            onPress={() => {
              if (action.onPress instanceof Function) {
                const confirmation =
                  action.confirm !== undefined ? action.confirm : swipeActions[action.name].confirm;

                if (confirmation) {
                  actionAlert.current = {
                    message: handleMessage(data, swipeActions[action.name].title),
                    onPress: () => {
                      if (action.onPress) action.onPress(data);
                    },
                  };
                  togleOpen();
                } else {
                  action.onPress(data);
                }
              }
            }}
            activeOpacity={0.7}
            disabled={disabled}
          >
            <IconContainer
              color={swipeActions[action.name].color}
              index={index}
              length={array.length - 1}
              disabled={disabled}
            >
              <Icon
                icon={swipeActions[action.name].icon}
                name={swipeActions[action.name].name}
                color={theme.colors.secondary[0]}
                size={24}
              />
            </IconContainer>
          </TouchableOpacity>
        );
      })}
    </ActionsContainer>
  );

  const xAxis = useSharedValue(0);

  const handleGesture = Gesture.Pan()
    .onChange((event) => {
      if (-xAxis.value > swipeSize) return;
      if (xAxis.value > 0) return;

      xAxis.value += event.changeX;
    })
    .onFinalize((event) => {
      const isSwipePosition = swipeSize / (actions.length * 2);
      if (-event.translationX > isSwipePosition) {
        xAxis.value = withTiming(-swipeSize);
        return;
      }
      if (xAxis.value > -swipeSize - swipeSize / 2) {
        xAxis.value = withTiming(0);
      }
    })
    .activeOffsetX([-15, 15]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: xAxis.value }],
  }));

  return (
    <>
      <Alert
        title="Confirmação"
        message={actionAlert.current?.message}
        open={open}
        onClose={togleOpen}
        onConfirm={actionAlert.current?.onPress}
      />
      <AnimatedSwipeableContainer>
        {actionItems(data)}
        <GestureDetector gesture={handleGesture}>
          <Animated.View style={animatedStyle}>{children}</Animated.View>
        </GestureDetector>
      </AnimatedSwipeableContainer>
    </>
  );
}

export default Swipeable;

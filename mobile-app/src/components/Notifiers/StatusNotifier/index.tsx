import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import IconButton from "../../Icon";
import { GlobalContext } from "@/contexts/GlobalContext";
import styles from "./styles";
import { useNotifier } from "@/hooks";
import { useTheme } from "styled-components";
import { IIconsNotifier } from "./types";

const icons: IIconsNotifier = {
  success: "checkmark-circle-sharp",
  error: "warning",
  warning: "md-alert-circle",
  info: "md-information-circle",
};

function StatusNotifier() {
  const theme = useTheme();
  const style = styles();
  const [isUnmounted, setIsUnmounted] = useState(true);
  const { notifierStates } = useContext(GlobalContext)!;
  const { closeNofication } = useNotifier();

  const yAxis = useSharedValue(-40);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: yAxis.value,
    };
  });

  function openNotifier() {
    setIsUnmounted(false);

    if (StatusBar.currentHeight) {
      yAxis.value = withTiming(StatusBar.currentHeight + 10);
    } else {
      yAxis.value = withTiming(10);
    }
  }

  function unMountNotifier() {
    setIsUnmounted(true);
    if (notifierStates) closeNofication();
  }

  function closeNotifier() {
    yAxis.value = withTiming(-40, undefined, () => runOnJS(unMountNotifier)());
  }

  useEffect(() => {
    if (notifierStates) {
      openNotifier();

      let timeoutId: NodeJS.Timeout;

      if (!notifierStates.noTimeout) {
        const delay = notifierStates.duration ?? 3000;
        timeoutId = setTimeout(() => {
          closeNotifier();
          if (notifierStates.callback instanceof Function) notifierStates.callback();
        }, delay);
      }

      return () => clearTimeout(timeoutId);
    }

    closeNotifier();
  }, [notifierStates]);

  if (isUnmounted || !notifierStates) return null;

  return (
    <Animated.View style={[style.container, animatedStyle]}>
      <View style={[style.alert, { backgroundColor: theme.colors[notifierStates.status][200] }]}>
        <View style={style.innerContainer}>
          <View style={style.messageContainer}>
            <IconButton
              style={{ alignSelf: "flex-start" }}
              icon={Ionicons}
              name={icons[notifierStates.status]}
              color={theme.colors[notifierStates.status][900]}
              size={20}
            />
            <Text style={[style.messageText, { color: theme.colors[notifierStates.status][900] }]}>
              {notifierStates.message}
            </Text>
          </View>
          <TouchableOpacity onPress={closeNotifier} style={style.closeButton}>
            <Ionicons name="close" size={18} color={theme.colors[900]} />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

export default StatusNotifier;

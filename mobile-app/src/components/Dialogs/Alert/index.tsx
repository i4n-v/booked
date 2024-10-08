import React, { useEffect } from "react";
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { useTheme } from "styled-components";
import styles, {
  ActionsContainer,
  AlertContainer,
  CloseButton,
  Emphasis,
  MajorCircle,
  Message,
  MessageContainer,
  MinorCircle,
  Overlay,
  Title,
} from "./styles";
import { MainButton } from "../../Buttons";
import { IAlertProps } from "./types";
import Icon from "@/components/Icon";

const AnimatedAlertContainer = Animated.createAnimatedComponent(AlertContainer);

function Alert({
  title,
  message,
  open,
  status = "error",
  onClose,
  onConfirm,
  onCancel,
  confirmTextButton = "Confirmar",
  cancelTextButton = "Cancelar",
  hasActions = true,
}: IAlertProps) {
  const style = styles();
  const theme = useTheme();

  const xAxis = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      right: xAxis.value,
    };
  });

  const processMessage = (message: string) => {
    const splitedMessage = message.match(/[^*]+|\*[^*]+\*/g);

    return splitedMessage?.map((str) => {
      if (str.match(/^\*.*|\*$/gi)) {
        const cleanStr = str.replace(/\*/g, "");
        return <Emphasis>{`${cleanStr} `}</Emphasis>;
      }
      return `${str} `;
    });
  };

  const animation = () => {
    xAxis.value = withSequence(
      withTiming(20, { duration: 170 }),
      withTiming(-20, { duration: 170 }),
      withTiming(0),
    );
  };

  useEffect(() => {
    if (open) {
      animation();
    }
  }, [open]);

  if (!open) return null;

  return (
    <Modal visible={open} transparent>
      <Overlay>
        <AnimatedAlertContainer style={animatedStyle}>
          <MessageContainer>
            {!hasActions && (
              <CloseButton
                onPress={() => {
                  onClose();
                }}
                name="close-outline"
                size={26}
                icon={Ionicons}
                color={theme.colors.secondary[900]}
              />
            )}
            <MajorCircle color={theme.colors[status][500] + "10"}>
              <MinorCircle color={theme.colors[status][500] + "20"}>
                <Icon
                  name="alert-circle-outline"
                  size={26}
                  icon={Ionicons}
                  color={theme.colors[status][500]}
                />
              </MinorCircle>
            </MajorCircle>
            <Title>{title}</Title>
            <Message>{processMessage(message)}</Message>
          </MessageContainer>
          {hasActions && (
            <ActionsContainer>
              <MainButton
                style={style.button}
                onPress={() => {
                  if (onCancel instanceof Function) onCancel();
                  onClose();
                }}
                variant="outlined"
              >
                {cancelTextButton}
              </MainButton>
              <MainButton
                style={style.button}
                onPress={() => {
                  if (onConfirm instanceof Function) onConfirm();
                  onClose();
                }}
              >
                {confirmTextButton}
              </MainButton>
            </ActionsContainer>
          )}
        </AnimatedAlertContainer>
      </Overlay>
    </Modal>
  );
}

export default Alert;

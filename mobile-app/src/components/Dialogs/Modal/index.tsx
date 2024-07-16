import React from "react";
import { IModalProps } from "./types";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import {
  ContainerChildren,
  ExternalContainer,
  ModalContainer,
  OnCloseButton,
  Title,
} from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

const AnimatedExternalContainer = Animated.createAnimatedComponent(ExternalContainer);

const Modal = ({
  title,
  open,
  onClose,
  containerStyles,
  children,
  hideCloseButton,
  fullScreen,
}: IModalProps) => {
  const theme = useTheme();
  const handleClose = () => {
    onClose(false);
  };

  if (open)
    return (
      <AnimatedExternalContainer entering={FadeIn} exiting={FadeOut}>
        <ModalContainer style={!fullScreen ? containerStyles : { width: "90%", height: "90%" }}>
          {!hideCloseButton && (
            <OnCloseButton onPress={handleClose}>
              <MaterialIcons name="close" size={24} color={theme.colors.text?.[500]} />
            </OnCloseButton>
          )}
          {title && <Title>{title}</Title>}
          {fullScreen ? <ContainerChildren>{children}</ContainerChildren> : children}
        </ModalContainer>
      </AnimatedExternalContainer>
    );
  else return null;
};

export default Modal;

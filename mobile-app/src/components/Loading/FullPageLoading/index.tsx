import React, { useContext } from "react";
import LottieView from "lottie-react-native";
import { GlobalContext } from "../../../contexts/GlobalContext";
import heartBeat from "../../../animations/heart-beat.json";
import { LoadingContainer, LoadingMessage } from "./styles";

function FullPageLoading() {
  const {
    loadingConfig: { isLoading, message, opacity = 0.9 },
  } = useContext(GlobalContext)!;

  if (!isLoading) return null;

  return (
    <LoadingContainer opacity={opacity}>
      <LottieView
        autoPlay
        source={heartBeat}
        style={{
          width: 300,
          height: 300,
        }}
      />
      {message && <LoadingMessage>{message}</LoadingMessage>}
    </LoadingContainer>
  );
}

export default FullPageLoading;

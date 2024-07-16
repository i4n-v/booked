import React from "react";
import LottieView from "lottie-react-native";
import {
  AnimationContainer,
  Container,
  EmphasisMessage,
  ErrorViewer,
  Message,
  Title,
  Wrapper,
} from "./styles";
import errorAnimation from "../../animations/error.json";
import { MainButton } from "../Buttons";
import { IErrorBoundary } from "./types";
import { ErrorBoundaryProps } from "expo-router";
import { Try } from "expo-router/build/views/Try";

export default function ErrorBoundary({ children }: IErrorBoundary) {
  const FallbackComponent = React.memo(({ error, retry }: ErrorBoundaryProps) => {
    if (error) {
      console.log(`
        ========== SYSTEM ERROR ==========
        ${error}
        ==================================
      `);
    }

    return (
      <Wrapper>
        <Container>
          <AnimationContainer>
            <LottieView
              autoPlay
              loop={false}
              source={errorAnimation}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </AnimationContainer>
          <Title>Ops, algo está errado...</Title>
        </Container>
        <Message>
          Ocorreu um erro interno no aplicativo, por favor, nos reporte o ocorrido assim que
          possível e tente novamente <EmphasisMessage>:D</EmphasisMessage>
        </Message>
        <MainButton onPress={retry}>Tentar novamente</MainButton>
        <ErrorViewer>/{error.toString()}</ErrorViewer>
      </Wrapper>
    );
  });

  return <Try catch={FallbackComponent}>{children}</Try>;
}

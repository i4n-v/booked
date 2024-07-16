import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import styled from "styled-components/native";

const SkeletonContainer = styled(View)`
  height: 20px;
  border-radius: 6px;
  overflow: hidden;
`;

const Skeleton = styled.View`
  width: 80%;
  height: 100%;
  opacity: 0.7;
`;

const SekeletonGradient = styled(LinearGradient)`
  z-index: -1;
  width: 100%;
  height: 100%;
`;

export { Skeleton, SkeletonContainer, SekeletonGradient };

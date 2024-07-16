import { StyleProp, ViewStyle } from "react-native";
import { SkeletonFlexibleCard } from "./Templates/SkeletonFlexibleCard";

interface ISkeletonTemplates {
  "flex-card": typeof SkeletonFlexibleCard;
}

interface ISkeletonProps {
  quantity?: number;
  template: keyof ISkeletonTemplates;
  style?: StyleProp<ViewStyle>;
}

export { ISkeletonProps, ISkeletonTemplates };

import { ReactElement } from "react";
import { StyleProp, ViewStyle } from "react-native";

type ISketonTemplateTypes = "book-card" | "user-card" | "comment-card";

type ISkeletonTemplates = {
  [key in ISketonTemplateTypes]: (props: any) => ReactElement<any, any>;
};

interface ISkeletonProps {
  quantity?: number;
  template: ISketonTemplateTypes;
  style?: StyleProp<ViewStyle>;
}

export { ISkeletonProps, ISkeletonTemplates };

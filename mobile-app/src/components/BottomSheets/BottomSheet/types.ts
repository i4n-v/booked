import { BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { BottomSheetScrollViewProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

type IBottomSheetModalProps = Omit<BottomSheetModalProps, "style"> &
  React.RefAttributes<BottomSheetModalMethods[]>;

interface IBottomSheetScrollViewProps extends BottomSheetScrollViewProps {
  contentContainerStyle: StyleProp<ViewStyle>;
}

interface IBottomSheetProps extends IBottomSheetModalProps {
  children: ReactNode;
  index?: number;
  snapPoints?: Array<string | number>;
  enableBackdropInteractions?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  backDropStyle?: StyleProp<ViewStyle>;
  scrollViewProps?: IBottomSheetScrollViewProps;
  onOpen?(): void;
  onClose?(): void;
}

export { IBottomSheetProps };

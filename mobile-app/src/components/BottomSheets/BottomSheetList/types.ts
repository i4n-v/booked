import { BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { BottomSheetFlatListProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { ViewStyle, StyleProp } from "react-native";

type IBottomSheetProps = Omit<BottomSheetModalProps, "children"> &
  React.RefAttributes<BottomSheetModalMethods[]>;

interface IFlatlisProps<T> extends BottomSheetFlatListProps<T> {
  loading?: boolean;
  itemKeyExtractor?: keyof T & string;
  emptyMessage?: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

interface IBottomSheetListProps<T> extends IBottomSheetProps {
  index?: number;
  snapPoints?: Array<string | number>;
  enableBackdropInteractions?: boolean;
  indicatorStyle?: StyleProp<ViewStyle>;
  backDropStyle?: StyleProp<ViewStyle>;
  flatListProps: IFlatlisProps<T>;
  onOpen?(): void;
  onClose?(): void;
}

export { IBottomSheetListProps, IFlatlisProps };

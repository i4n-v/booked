import { FlashListProps } from "@shopify/flash-list";
import { FlatList } from "react-native-gesture-handler";

type ISHPFlashListProps<T> = FlashListProps<T>;

interface IFlashListProps<T> extends ISHPFlashListProps<T> {
  itemKeyExtractor?: keyof T | string;
  emptyMessage?: string;
  loading?: boolean;
}

export { IFlashListProps };

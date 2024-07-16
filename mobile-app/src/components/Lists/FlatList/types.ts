import { FlatList } from "react-native-gesture-handler";

type IGHFlatListProps<T> = FlatList<T>["props"];

interface IFlatLisProps<T> extends IGHFlatListProps<T> {
  itemKeyExtractor?: keyof T | string;
  emptyMessage?: string;
  loading?: boolean;
}

export { IFlatLisProps };

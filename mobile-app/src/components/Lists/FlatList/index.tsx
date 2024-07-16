import React from "react";
import { FlatList as List } from "react-native-gesture-handler";
import { SpinnerLoading } from "../../Loading";
import accessObjectByString from "../../../utils/accessObjectByString";
import { IFlatLisProps } from "./types";
import EmptyComponent from "@/components/EmptyComponent";

export default function FlatListComponent<T = any>({
  data,
  renderItem,
  onEndReached,
  ListEmptyComponent,
  ListFooterComponent,
  loading,
  itemKeyExtractor,
  emptyMessage,
  contentContainerStyle,
  style,
  ...props
}: IFlatLisProps<T>) {
  return (
    <List
      data={data}
      style={style}
      contentContainerStyle={contentContainerStyle}
      onEndReached={onEndReached}
      renderItem={renderItem}
      keyExtractor={(item, index) => {
        if (typeof itemKeyExtractor === "string" && item instanceof Object) {
          return accessObjectByString(item, itemKeyExtractor);
        }

        return index;
      }}
      ListFooterComponent={
        loading && ListFooterComponent ? ListFooterComponent : loading ? <SpinnerLoading /> : null
      }
      ListEmptyComponent={
        !loading
          ? ListEmptyComponent || (
              <EmptyComponent emptyMessage={emptyMessage || "Nenhum item encontrado"} />
            )
          : null
      }
      {...props}
    />
  );
}

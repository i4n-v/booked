import React from "react";
import { FlashList as List } from "@shopify/flash-list";
import { SpinnerLoading } from "../../Loading";
import accessObjectByString from "../../../utils/accessObjectByString";
import EmptyComponent from "@/components/EmptyComponent";
import { IFlashListProps } from "./types";

function FlashList<T = any>({
  data,
  estimatedItemSize,
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
}: IFlashListProps<T>) {
  return (
    <List
      data={data}
      style={style}
      contentContainerStyle={contentContainerStyle}
      estimatedItemSize={estimatedItemSize}
      onEndReached={onEndReached}
      renderItem={renderItem}
      keyExtractor={(item, index) => {
        if (typeof itemKeyExtractor === "string" && item instanceof Object) {
          return accessObjectByString(item, itemKeyExtractor);
        }

        return index;
      }}
      ListFooterComponent={loading ? <SpinnerLoading /> : ListFooterComponent}
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

export default FlashList;

import React, { ForwardedRef, forwardRef, useMemo } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { useBottomSheetDynamicSnapPoints } from "@gorhom/bottom-sheet";
import styles from "./styles";
import BottomSheetList from "../BottomSheetList";
import { Icon } from "../..";
import { IBottomSheetMenuProps } from "./types";
import { ExpoVectorIcon } from "@/types/ExpoVectorIcons";

function BottomSheetMenuComponent<T extends ExpoVectorIcon>(
  { items, onOpen, onClose }: IBottomSheetMenuProps<T>,
  ref: ForwardedRef<any>,
) {
  const bottomSheetMenuStyles = styles();
  const anything: any = true;

  const maxHeight = useMemo(() => Dimensions.get("window").height * 0.967, []);
  const isHeightBreak = useMemo(() => items.length * 60 > maxHeight, [items]);


  return (
    <BottomSheetList
      ref={ref}
      index={0}
      waitFor={anything}
      simultaneousHandlers={anything}
      enableDynamicSizing
      snapPoints={[]}
      onOpen={onOpen}
      onClose={onClose}
      flatListProps={{
        style: [isHeightBreak ? { maxHeight } : undefined],
        ItemSeparatorComponent: () => {
          return <View style={bottomSheetMenuStyles.itemSeparator} />;
        },
        data: items,
        renderItem: ({ item }) => (
          <TouchableOpacity
            style={[
              bottomSheetMenuStyles.listItemContainer,
              item.disabled && bottomSheetMenuStyles.disabled,
            ]}
            onPress={() => {
              if (item.onPress instanceof Function) {
                item.onPress(item);
              }
            }}
            disabled={item.disabled}
          >
            <Icon
              icon={item.icon}
              name={item.name}
              color={bottomSheetMenuStyles.iconButton.color}
              size={24}
            />
            <Text style={bottomSheetMenuStyles.itemText}>{item.text}</Text>
          </TouchableOpacity>
        ),
      }}
    />
  );
}

type IBottomSheetMenuAssertion = <T extends ExpoVectorIcon>(
  props: IBottomSheetMenuProps<T> & { ref?: ForwardedRef<any> },
) => ReturnType<typeof BottomSheetMenuComponent>;

const BottomSheetMenu = forwardRef(BottomSheetMenuComponent) as IBottomSheetMenuAssertion;

export default BottomSheetMenu;

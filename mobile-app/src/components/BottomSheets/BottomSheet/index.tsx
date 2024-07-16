import React, { forwardRef, useRef } from "react";
import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import styles, { Backdrop } from "./styles";
import { IBottomSheetProps } from "./types";

const BottomSheet = forwardRef(
  (
    {
      children,
      index = 0,
      snapPoints = [20, "25%", "50%", "75%", "95%"],
      enableBackdropInteractions = false,
      onChange,
      containerStyle,
      indicatorStyle,
      backDropStyle,
      scrollViewProps,
      onOpen,
      onClose,
      ...props
    }: IBottomSheetProps,
    ref: any,
  ) => {
    const bottomSheetStyles = styles();
    const firstRender = useRef(true);

    const CustomBackDrop = React.memo(({ style }: BottomSheetBackdropProps) => (
      <Backdrop style={[style, backDropStyle]} />
    ));

    return (
      <BottomSheetModal
        ref={ref}
        index={index}
        snapPoints={snapPoints}
        onChange={onChange}
        style={[bottomSheetStyles.container, containerStyle]}
        handleIndicatorStyle={[bottomSheetStyles.indicator, indicatorStyle]}
        backdropComponent={enableBackdropInteractions ? undefined : CustomBackDrop}
        handleStyle={backDropStyle}
        onAnimate={() => {
          if (firstRender.current && onOpen instanceof Function) {
            onOpen();
          }
        }}
        onDismiss={onClose}
        {...props}
      >
        <BottomSheetScrollView
          {...scrollViewProps}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            bottomSheetStyles.contentContainer,
            scrollViewProps?.contentContainerStyle,
          ]}
        >
          {children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  },
);

export default BottomSheet;

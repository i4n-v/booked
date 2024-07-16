import React, { useEffect, useMemo, useState } from "react";
import { useController } from "react-hook-form";
import { Dimensions, Keyboard } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useBottomSheetDynamicSnapPoints } from "@gorhom/bottom-sheet";
import { useTheme } from "styled-components";
import accessObjectByString from "../../../utils/accessObjectByString";
import TextField from "../TextField";
import { BottomSheetList } from "../../BottomSheets";
import { useBottomSheet } from "../../../hooks";
import { ISelectFieldProps } from "./types";
import { InputOption } from "../FieldUtilitaries";

function SelectField<T extends Record<string, any>>({
  name,
  label,
  control,
  options = [],
  optionKeyExtractor,
  optionLabelKey,
  optionValueKey,
  optionCompareKey,
  emptyMessage,
  placeholder,
  required,
  disabled,
  inputProps,
  containerProps,
  listProps,
  loading,
  onChange,
  customOnChange,
  onFocus,
  onBlur,
}: ISelectFieldProps<T>) {
  const theme = useTheme();
  const optionIdentifier = useMemo(() => {
    return optionCompareKey || optionLabelKey;
  }, [optionCompareKey, optionLabelKey]);

  const anything: any = true;

  const [ref, handleOpen, handleClose] = useBottomSheet();
  const maxHeight = useMemo(() => {
    const height = Dimensions.get("window").height * 0.967;
    const isHeightBreak = options.length * 60 > height;
    const heightStyle = {
      maxHeight: height,
    };

    return isHeightBreak ? heightStyle : undefined;
  }, [options]);

  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(["CONTENT_HEIGHT"]);

  const {
    field,
    formState: { errors },
  } = useController({ name, control });
  const error = errors[field.name]?.message as string | undefined;

  const [open, setOpen] = useState(false);
  const [textValue, setTextValue] = useState<string | undefined>();

  useEffect(() => {
    if (field.value instanceof Object) {
      setTextValue(accessObjectByString(field.value, optionLabelKey));
    } else if (optionValueKey) {
      const findedOption = options.find(
        (item) => accessObjectByString(item, optionValueKey) === field.value,
      );

      if (findedOption) setTextValue(accessObjectByString(findedOption, optionLabelKey));
    }
  }, [field.value, optionLabelKey]);

  function handleChange(item: T) {
    field.onChange(item);

    if (customOnChange instanceof Function) {
      customOnChange(item);
    }
  }

  function verifySelectedOptions(item: T) {
    if (optionValueKey) {
      return accessObjectByString(item, optionValueKey) === field.value;
    }

    if (field.value instanceof Object) {
      return (
        accessObjectByString(field.value, optionIdentifier) ===
        accessObjectByString(item, optionIdentifier)
      );
    }

    return false;
  }

  return (
    <>
      <TextField
        containerProps={containerProps}
        label={label}
        value={textValue}
        placeholder={placeholder}
        errorMessage={error}
        showErrorMessage={!open}
        disabled={disabled}
        required={required}
        selectionColor={theme.colors.secondary[100]}
        inputProps={{
          showSoftInputOnFocus: false,
          ...inputProps,
        }}
        rightIcon={{
          name: open ? "arrow-drop-up" : "arrow-drop-down",
          icon: MaterialIcons,
          color: theme.colors.primary[200],
        }}
        onFocus={(event) => {
          if (Keyboard.isVisible()) {
            Keyboard.dismiss();
          }

          if (onFocus instanceof Function) {
            onFocus(event);
          }

          handleOpen();
        }}
      />
      <BottomSheetList
        ref={ref}
        index={0}
        snapPoints={animatedSnapPoints as any}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        waitFor={anything}
        simultaneousHandlers={anything}
        onClose={() => {
          setOpen(false);
          Keyboard.dismiss();

          if (onBlur instanceof Function) {
            onBlur();
          }
        }}
        onOpen={() => setOpen(true)}
        flatListProps={{
          ...listProps,
          onLayout: handleContentLayout,
          style: [listProps?.style, maxHeight],
          data: options,
          nestedScrollEnabled: true,
          emptyMessage,
          loading,
          keyExtractor: (item, index) =>
            optionKeyExtractor ? accessObjectByString(item, optionKeyExtractor) : index,
          renderItem: ({ item }) => (
            <InputOption
              selected={verifySelectedOptions(item as T)}
              onPress={() => {
                const value = optionValueKey ? accessObjectByString(item, optionValueKey) : item;

                handleChange(value);

                if (onChange instanceof Function) {
                  onChange(value);
                }

                handleClose();
              }}
            >
              {accessObjectByString(item, optionLabelKey)}
            </InputOption>
          ),
        }}
      />
    </>
  );
}

export default SelectField;

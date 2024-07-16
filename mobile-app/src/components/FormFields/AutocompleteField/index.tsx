import React, { useEffect, useMemo, useRef, useState } from "react";
import { useController } from "react-hook-form";
import { Keyboard, View } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import accessObjectByString from "../../../utils/accessObjectByString";
import TextField from "../TextField";
import { InputList, OptionTag, OptionTagContainer, OptionTagLabel } from "./styles";
import { IconButton } from "../../Buttons";
import { IAutocompleteProps } from "./types";
import { InputOption } from "../FieldUtilitaries";

function AutoCompleteField<T extends Record<string, any>>({
  value,
  name,
  label,
  control,
  multiple = false,
  options = [],
  optionKeyExtractor,
  optionLabelKey = "label",
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
  onChangeText,
  onFocus,
  onBlur,
}: IAutocompleteProps<T>) {
  const theme = useTheme();

  const {
    field,
    formState: { errors },
  } = useController({ name, control });
  const error = errors[field.name]?.message as string | undefined;

  const [open, setOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<T[]>([]);
  const [textValue, setTextValue] = useState<string | null>(null);
  const choosedListItemRef = useRef(false);
  const optionIdentifier = useMemo(() => {
    return optionCompareKey || optionLabelKey;
  }, [optionCompareKey, optionLabelKey]);

  useEffect(() => {
    if (field.value instanceof Object && value === undefined && !multiple) {
      setTextValue(accessObjectByString(field.value, optionLabelKey));
    } else if (optionValueKey && value === undefined && !multiple) {
      const findedOption = filteredOptions.find(
        (item) => accessObjectByString(item, optionValueKey) === field.value,
      );

      if (findedOption) setTextValue(accessObjectByString(findedOption, optionLabelKey));
    } else if (!field.value && textValue) {
      setTextValue(null);
    }
  }, [field.value, optionLabelKey]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  function filterOptionsByText(value: string) {
    const hasValue = field.value instanceof Object;
    const newValue =
      hasValue && textValue !== value ? (choosedListItemRef.current ? null : textValue) : value;
    if (newValue) {
      const regex = new RegExp(newValue, "i");
      const searchedOptions = options.filter((item) =>
        regex.test(accessObjectByString(item, optionLabelKey)),
      );
      setFilteredOptions(searchedOptions);
    } else {
      setFilteredOptions(options);
    }
    choosedListItemRef.current = false;

    setTextValue(newValue);
    if (hasValue) field.onChange(null);
  }

  function handleChange(item: T) {
    if (!multiple) {
      field.onChange(item);

      if (customOnChange instanceof Function) {
        customOnChange(item);
      }
    } else {
      setTextValue(null);

      let optionsValue = [item];

      if (Array.isArray(field.value)) {
        optionsValue = [...field.value, item];

        const optionToRemove = field.value.findIndex((option) => {
          if (optionValueKey) {
            return item === option;
          }

          return (
            accessObjectByString(option, optionIdentifier) ===
            accessObjectByString(item, optionIdentifier)
          );
        });

        if (optionToRemove !== -1) {
          optionsValue = field.value.filter((option) => {
            if (optionValueKey) {
              return item !== option;
            }

            return (
              accessObjectByString(option, optionIdentifier) !==
              accessObjectByString(item, optionIdentifier)
            );
          });
        }
      }

      field.onChange(optionsValue);

      if (customOnChange instanceof Function) {
        customOnChange(optionsValue);
      }
    }
  }

  function handleRemoveOption(item: T) {
    if (Array.isArray(field.value)) {
      const filteredOptions = field.value.filter((option) => {
        if (optionValueKey) {
          return accessObjectByString(item, optionValueKey) !== option;
        }

        return (
          accessObjectByString(option, optionIdentifier) !==
          accessObjectByString(item, optionIdentifier)
        );
      });

      field.onChange(filteredOptions);
    }
  }

  function verifySelectedOptions(item: T) {
    if (multiple) {
      return field.value?.some((option: any) => {
        if (optionValueKey) {
          return accessObjectByString(item, optionValueKey) === option;
        }

        return (
          accessObjectByString(option, optionIdentifier) ===
          accessObjectByString(item, optionIdentifier)
        );
      });
    }

    if (optionValueKey) {
      return accessObjectByString(item, optionValueKey) === field.value;
    }

    if (field.value) {
      return (
        accessObjectByString(field.value, optionIdentifier) ===
        accessObjectByString(item, optionIdentifier)
      );
    }

    return false;
  }

  function togleOpen() {
    if (open) {
      setOpen(false);
      Keyboard.dismiss();
    } else {
      setOpen(true);
    }
  }

  return (
    <View {...containerProps}>
      <TextField
        {...inputProps}
        containerProps={containerProps}
        label={label}
        value={value !== undefined ? value : textValue}
        placeholder={placeholder}
        errorMessage={error}
        showErrorMessage={!open}
        disabled={disabled}
        required={required}
        onChangeText={onChangeText instanceof Function ? onChangeText : filterOptionsByText}
        rightIcon={{
          name: open ? "arrow-drop-up" : "arrow-drop-down",
          icon: MaterialIcons,
          color: theme.colors.primary?.[200],
        }}
        onFocus={(event) => {
          if (onFocus instanceof Function) {
            onFocus(event);
          }

          togleOpen();
        }}
        onBlur={(event) => {
          Keyboard.dismiss();
          choosedListItemRef.current = true;
          if (!(field.value instanceof Object) && !onBlur && !optionValueKey) {
            setTextValue(null);
          }

          if (onBlur instanceof Function) {
            onBlur(event);
          }

          if (open) togleOpen();
        }}
      />
      {open && (
        <InputList
          {...listProps}
          data={filteredOptions}
          nestedScrollEnabled
          keyboardShouldPersistTaps="always"
          emptyMessage={emptyMessage}
          loading={loading}
          itemKeyExtractor={optionKeyExtractor}
          renderItem={({ item }) => (
            <InputOption
              selected={verifySelectedOptions(item)}
              onPress={() => {
                const value = optionValueKey ? accessObjectByString(item, optionValueKey) : item;
                handleChange(value);

                if (onChange instanceof Function) {
                  onChange(value);
                }

                togleOpen();
              }}
            >
              {accessObjectByString(item, optionLabelKey)}
            </InputOption>
          )}
        />
      )}
      {multiple && !open && field.value?.length > 0 && (
        <OptionTagContainer>
          {field.value.map((option: any) => {
            let item: T = option;

            if (optionValueKey) {
              item = filteredOptions.find(
                (item) => accessObjectByString(item, optionValueKey) === option,
              )!;
            }

            return (
              <OptionTag key={accessObjectByString(item, optionLabelKey)}>
                <OptionTagLabel>{accessObjectByString(item, optionLabelKey)}</OptionTagLabel>
                <IconButton
                  name="close"
                  icon={MaterialCommunityIcons}
                  color={theme.colors.primary?.[200]}
                  size={14}
                  onPress={() => handleRemoveOption(item)}
                />
              </OptionTag>
            );
          })}
        </OptionTagContainer>
      )}
    </View>
  );
}

export default AutoCompleteField;

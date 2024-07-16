import React, { useMemo } from "react";
import { useController } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import accessObjectByString from "../../../utils/accessObjectByString";
import {
  CheckBoxInput,
  CheckBoxInputLabel,
  CheckBoxOption,
  CheckboxContainer,
  OptionsContainer,
} from "./styles";
import { ErrorMessage, Label } from "../FieldUtilitaries";
import { ICheckBoxFieldProps } from "./types";

function CheckboxField<T extends Record<string, any>>({
  name,
  value,
  label,
  control,
  direction = "column",
  options,
  optionLabelKey,
  optionValueKey,
  optionCompareKey,
  optionKeyExtractor,
  required,
  disabled,
  containerProps,
  onChange,
  customOnChange,
}: ICheckBoxFieldProps<T>) {
  const theme = useTheme();
  const optionIdentifier = useMemo(() => {
    return optionCompareKey || optionLabelKey;
  }, [optionCompareKey, optionLabelKey]);

  const {
    field,
    formState: { errors },
  } = useController({ name, control });
  const error = errors[field.name]?.message as string | undefined;

  const fieldValue: any[] = value !== undefined ? value : field.value;

  function handleChange(item: T) {
    let optionsValue = [
      (optionValueKey as string) ? accessObjectByString(item, optionValueKey as string) : item,
    ];

    if (Array.isArray(fieldValue)) {
      optionsValue = [...fieldValue, ...optionsValue];

      const optionToRemove = fieldValue.findIndex((option) => {
        if (optionValueKey as string) {
          return accessObjectByString(item, optionValueKey as string) === option;
        }

        return (
          accessObjectByString(option, optionIdentifier as string) ===
          accessObjectByString(item, optionIdentifier as string)
        );
      });

      if (optionToRemove !== -1) {
        optionsValue = fieldValue.filter((option) => {
          if (optionValueKey as string) {
            return accessObjectByString(item, optionValueKey as string) !== option;
          }

          return (
            accessObjectByString(option, optionIdentifier as string) !==
            accessObjectByString(item, optionIdentifier as string)
          );
        });
      }
    }

    field.onChange(optionsValue);

    if (customOnChange instanceof Function) {
      customOnChange(optionsValue);
    }
  }

  function verifySelectedOptions(item: T) {
    return fieldValue.some((option) => {
      if (optionValueKey as string) {
        return accessObjectByString(item, optionValueKey as string) === option;
      }

      return (
        accessObjectByString(option, optionIdentifier as string) ===
        accessObjectByString(item, optionIdentifier as string)
      );
    });
  }

  return (
    <CheckboxContainer {...containerProps}>
      <Label disabled={disabled} required={required} error={!!error}>
        {label}
      </Label>
      <OptionsContainer direction={direction}>
        {options.map((item, index) => {
          const selected = verifySelectedOptions(item);

          return (
            <CheckBoxOption
              onPress={() => {
                if (onChange instanceof Function) {
                  onChange(item);
                } else {
                  handleChange(item);
                }
              }}
              disabled={item.disabled || disabled}
              key={
                optionKeyExtractor ? accessObjectByString(item, optionKeyExtractor as any) : index
              }
            >
              <CheckBoxInput error={!!error} selected={selected}>
                <MaterialIcons
                  style={{
                    opacity: selected ? 1 : 0,
                  }}
                  name="check"
                  size={16}
                  color={theme.colors.secondary[0]}
                />
              </CheckBoxInput>
              <CheckBoxInputLabel>
                {accessObjectByString(item, optionLabelKey as any)}
              </CheckBoxInputLabel>
            </CheckBoxOption>
          );
        })}
      </OptionsContainer>
      <ErrorMessage>{error}</ErrorMessage>
    </CheckboxContainer>
  );
}

export default CheckboxField;

import React, { useMemo } from "react";
import { useController } from "react-hook-form";
import accessObjectByString from "../../../utils/accessObjectByString";
import {
  OptionsContainer,
  RadioContainer,
  RadioInput,
  RadioInputLabel,
  RadioInputSelection,
  RadioOption,
} from "./styles";
import { ErrorMessage, Label } from "../FieldUtilitaries";
import { IRadioFieldProps } from "./types";

function RadioField<T extends Record<string, any>>({
  name,
  value,
  label,
  control,
  direction = "column",
  options,
  optionLabelKey = "label",
  optionValueKey,
  optionCompareKey,
  optionKeyExtractor,
  required,
  disabled,
  containerProps,
  onChange,
  customOnChange,
}: IRadioFieldProps<T>) {
  const optionIdentifier = useMemo(() => {
    return optionCompareKey || optionLabelKey;
  }, [optionCompareKey, optionLabelKey]);

  const {
    field,
    formState: { errors },
  } = useController({ name, control });
  const error = errors[field.name]?.message as string | undefined;

  const fieldValue: any = value !== undefined ? value : field.value;

  function handleChange(item: T) {
    let newValue = null;

    if (optionValueKey) {
      const value = accessObjectByString(item, optionValueKey);
      newValue = value === fieldValue ? newValue : value;
    } else {
      const optionValue = accessObjectByString(item, optionIdentifier);

      if (fieldValue) {
        const newFieldValue = accessObjectByString(fieldValue, optionIdentifier);
        newValue = optionValue === newFieldValue ? newValue : item;
      } else {
        newValue = item;
      }
    }

    field.onChange(newValue);

    if (customOnChange instanceof Function) customOnChange(newValue);
  }

  function verifySelectedOptions(item: T) {
    if (optionValueKey) {
      return accessObjectByString(item, optionValueKey) === fieldValue;
    }

    if (fieldValue) {
      return (
        accessObjectByString(fieldValue, optionIdentifier) ===
        accessObjectByString(item, optionIdentifier)
      );
    }

    return false;
  }

  return (
    <RadioContainer {...containerProps}>
      <Label disabled={disabled} required={required} error={!!error}>
        {label}
      </Label>
      <OptionsContainer direction={direction}>
        {options?.map((item, index) => {
          const selected = verifySelectedOptions(item);

          return (
            <RadioOption
              disabled={item.disabled || disabled}
              onPress={() => (onChange instanceof Function ? onChange(item) : handleChange(item))}
              key={optionKeyExtractor ? accessObjectByString(item, optionKeyExtractor) : index}
            >
              <RadioInput selected={selected} error={!!error}>
                <RadioInputSelection selected={selected} />
              </RadioInput>
              <RadioInputLabel>{accessObjectByString(item, optionLabelKey)}</RadioInputLabel>
            </RadioOption>
          );
        })}
      </OptionsContainer>
      <ErrorMessage>{error}</ErrorMessage>
    </RadioContainer>
  );
}

export default RadioField;

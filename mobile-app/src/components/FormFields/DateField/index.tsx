import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useController } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { Keyboard } from "react-native";
import { useTheme } from "styled-components";
import TextField from "../TextField";
import { IDateFieldProps, IDateIcons } from "./types";

function DateField({
  name,
  control,
  mode = "date",
  dateFormat,
  maximumDate,
  minimumDate,
  label,
  placeholder,
  required,
  disabled,
  customOnChange,
  inputProps,
  containerProps,
}: IDateFieldProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  function togleOpen() {
    setOpen((open) => !open);

    if (open) {
      Keyboard.dismiss();
    }
  }

  const {
    field,
    formState: { errors },
  } = useController({ name, control });
  const error = errors[field.name]?.message as string | undefined;

  const formats = {
    date: "dd/MM/yyyy",
    time: "hh:mm",
  };

  const icons: IDateIcons = {
    date: "date-range",
    time: "access-time",
  };

  return (
    <>
      <TextField
        label={label}
        value={field.value ? format(field.value, dateFormat || formats[mode]) : field.value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        errorMessage={error}
        selectionColor={theme.colors.secondary[100]}
        inputProps={{
          ...inputProps,
          showSoftInputOnFocus: false,
        }}
        containerProps={containerProps}
        onChangeText={() => {}}
        onFocus={() => togleOpen()}
        rightIcon={{
          name: icons[mode],
          color: theme.colors.primary[200],
          icon: MaterialIcons,
        }}
      />
      {open && (
        <DateTimePicker
          mode={mode}
          value={field.value || new Date()}
          is24Hour
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          onChange={(event, date) => {
            if (event?.type !== "dismissed") {
              togleOpen();
              field.onChange(date);

              if (customOnChange instanceof Function) customOnChange(date);
            } else {
              togleOpen();
            }
          }}
          onTouchCancel={togleOpen}
        />
      )}
    </>
  );
}

export default DateField;

import React, { useCallback, useState } from "react";
import { useController } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { formatWithMask } from "../../../utils/mask";
import { InputContainer, InputIconButton, TextInput } from "./styles";
import { ErrorMessage, Label } from "../FieldUtilitaries";
import { ITextFieldProps } from "./types";
import { ExpoVectorIcon } from "@/types/ExpoVectorIcons";

const defaultController: any = {
  field: {},
  formState: {
    errors: {},
  },
};

function TextField<L extends ExpoVectorIcon, R extends ExpoVectorIcon = L>({
  name,
  value,
  control,
  label,
  textArea,
  numberOfLines = 10,
  mask,
  password = false,
  errorMessage,
  showErrorMessage = true,
  selectionColor,
  leftIcon,
  rightIcon,
  placeholder,
  required,
  disabled,
  customOnChange,
  containerProps,
  inputProps,
  onChangeText,
  onBlur,
  onEndEditing,
  onFocus,
}: ITextFieldProps<L, R>) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const [visibility, setVisibility] = useState(() => (password ? "visibility" : "visibility-off"));

  const {
    field,
    formState: { errors },
  } = name && control ? useController({ name, control }) : defaultController;
  const error = errorMessage || errors[field.name]?.message;

  const toggleFocus = useCallback(() => {
    setFocused((focused) => !focused);
  }, []);

  const toggleVisibility = useCallback(() => {
    setVisibility((visibility) => (visibility === "visibility" ? "visibility-off" : "visibility"));
  }, []);

  return (
    <InputContainer {...containerProps}>
      <Label error={error} disabled={disabled} required={required}>
        {label}
      </Label>
      <TextInput
        multiline={textArea}
        {...inputProps}
        style={[
          textArea && {
            verticalAlign: "top",
          },
          inputProps?.style,
        ]}
        numberOfLines={numberOfLines}
        value={value || field.value || undefined}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.secondary?.[400]}
        selectionColor={selectionColor || theme.colors.primary?.[0]}
        editable={!disabled}
        focused={focused}
        error={!!error}
        secureTextEntry={visibility === "visibility"}
        leftIcon={leftIcon as any}
        rightIcon={leftIcon as any}
        password={password}
        textArea={textArea}
        onEndEditing={onEndEditing}
        onChangeText={(value) => {
          let newValue = value;

          if (mask) {
            newValue = formatWithMask({
              mask,
              text: value,
            }).masked;
          }

          if (onChangeText instanceof Function) {
            onChangeText(newValue);

            if (customOnChange instanceof Function) {
              customOnChange(newValue);
            }
          } else {
            field.onChange(newValue);

            if (customOnChange instanceof Function) {
              customOnChange(newValue);
            }
          }
        }}
        onBlur={(event) => {
          toggleFocus();

          if (onBlur instanceof Function) {
            onBlur(event);
          }
        }}
        onFocus={(event) => {
          toggleFocus();

          if (onFocus instanceof Function) {
            onFocus(event);
          }
        }}
      />
      {leftIcon && (
        <InputIconButton
          error={showErrorMessage && error}
          direction="left"
          name={leftIcon.name}
          icon={leftIcon.icon}
          color={leftIcon.color ?? theme.colors.primary?.[200]}
          size={24}
          activeOpacity={leftIcon.onPress ? 0.7 : 1}
          onPress={leftIcon.onPress}
        />
      )}
      {(rightIcon || password) && (
        <InputIconButton
          error={!!(showErrorMessage && error)}
          direction="right"
          name={password ? visibility : rightIcon!.name}
          icon={password ? (MaterialIcons as any) : rightIcon!.icon}
          color={rightIcon?.color ?? theme.colors.primary?.[200]}
          size={24}
          activeOpacity={rightIcon?.onPress ? 0.7 : 1}
          onPress={password ? toggleVisibility : rightIcon!.onPress}
        />
      )}
      <ErrorMessage>{showErrorMessage ? error : null}</ErrorMessage>
    </InputContainer>
  );
}

export default TextField;

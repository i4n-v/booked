import React from "react";
import { useController } from "react-hook-form";
import { useTheme } from "styled-components";
import { FieldContainer, Photo, UnknownPhoto } from "./styles";
import { IPhotoFieldProps } from "./types";
import { Add } from "@/components/Icons";
import { TouchableOpacity } from "react-native";
import { Label } from "../FieldUtilitaries";
import { getDocumentAsync } from "expo-document-picker";

function PhotoField({
  name,
  label,
  control,
  disabled,
  types = "image/*",
  containerProps,
  customOnChange,
}: IPhotoFieldProps) {
  const theme = useTheme();

  const { field } = useController({ name, control });

  const handleChange = async (onChange: (file: any) => void) => {
    try {
      const result = await getDocumentAsync({
        type: types,
        multiple: false,
        copyToCacheDirectory: false,
      });

      if (!result.canceled) {
        const { mimeType, ...file } = result.assets[0];

        const fileToUpload = {
          ...file,
          type: mimeType,
        };

        onChange(fileToUpload);

        if (customOnChange instanceof Function) customOnChange(fileToUpload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FieldContainer {...containerProps}>
      <TouchableOpacity
        activeOpacity={theme.shape.opacity}
        onPress={() => handleChange(field.onChange)}
        disabled={disabled}
      >
        {field.value ? (
          <Photo source={{ uri: field.value.uri }} disabled={disabled} />
        ) : (
          <UnknownPhoto disabled={disabled}>
            <Add width={50} height={50} />
          </UnknownPhoto>
        )}
      </TouchableOpacity>
      <Label>{label}</Label>
    </FieldContainer>
  );
}

export default PhotoField;

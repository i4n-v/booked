import React from "react";
import { Controller } from "react-hook-form";
import * as DocumentPicker from "expo-document-picker";
import { Container, FileButton } from "./style";
import Picture from "@/components/Icons/Picture";
import { useTheme } from "styled-components/native";

type InputFileProps = {
  name: string;
  control: any;
  onSelectFile?(...args: any): any;
  types?: string[] | string;
};

const InputFile: React.FC<InputFileProps> = ({ name, control, types, onSelectFile }) => {
  const theme = useTheme();

  const pickDocument = async (onChange: (file: any) => void) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
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
        if (onSelectFile instanceof Function) onSelectFile(fileToUpload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Container>
          <FileButton
            variant={value ? "contained" : "outlined"}
            hasValue={!!value}
            colorScheme="primary"
            onPress={() => pickDocument(onChange)}
          >
            <Picture fill={value ? "white" : theme.colors.primary?.[300]} />
          </FileButton>
        </Container>
      )}
    />
  );
};

export default InputFile;

import React from "react";
import { Controller } from "react-hook-form";
import * as DocumentPicker from "expo-document-picker";
import { Container, FileButton } from "./style";
import Picture from "@/components/Icons/Picture";
import { useTheme } from "styled-components/native";
import { copyAsync, documentDirectory } from "expo-file-system";

type InputFileProps = {
  name: string;
  control: any;
  onSelectFile?(...args: any): any;
  types?: string[] | string;
};

const InputFile: React.FC<InputFileProps> = ({ name, control, types, onSelectFile }) => {
  const pickDocument = async (onChange: (file: any) => void) => {
    try {
      
      const result = await DocumentPicker.getDocumentAsync({
        type: types,
        multiple: false,
        copyToCacheDirectory: false
      })

      if (!result.canceled) {
        
        let {  name,size, uri ,mimeType} = result.assets[0];
        const imageUri = documentDirectory + name
        await copyAsync({
          from: uri,
          to: imageUri
        })
        var fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type:mimeType ,
        };
        onChange(fileToUpload);
        if (onSelectFile instanceof Function) onSelectFile(fileToUpload);
      }
    } catch (error) {
      console.log(error);
      
    }
  };
  const theme = useTheme();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Container>
          <FileButton
            variant={value ? "contained" : "outlined"}
            hasValue={!!value}
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

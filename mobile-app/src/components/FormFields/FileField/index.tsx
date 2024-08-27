import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Image, Alert, Text } from 'react-native';
import {  Controller } from 'react-hook-form';
import Picture from '@/components/Icons/Picture';
import { isCancel, pick, pickSingle } from 'react-native-document-picker';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  width: 70px;
  height: 44px;
`;

const FileButton = styled(TouchableOpacity)`
  background-color: #9b59b6; /* Purple background */
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;

const SelectedFileName = styled.Text`
  flex: 1;
  margin-left: 10px;
  color: #333;
`;


interface IFileInput{
    control: any;
    name: string;
}

const FileField = ({control,name}: IFileInput) => {

  const pickDocument = async (onChange: (file: any) => void) => {
    try {
      const result = await pickSingle({mode: "import"})
      onChange(result);
    } catch (err) {
      if (isCancel(err)) {
        // User canceled the picker
      } else {
        console.log(err)
        Alert.alert('Error', `${err}`);
      }
    }
  };

  return (
    <Container>
      <Controller
        control={control}
        name={name}
        defaultValue={null}
        render={({ field: { onChange, value } }) => (
          <>
            <FileButton onPress={() => pickDocument(onChange)} >
              <Picture />
            </FileButton>
            {value && <SelectedFileName>{value.name}</SelectedFileName>}
          </>
        )}
      />
    </Container>
  );
};

export default FileField;

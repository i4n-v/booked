import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextField, DateField } from "@/components/FormFields";
import { MainButton } from "@/components/Buttons";
import { FormContainer } from "../security/styles";
import { User } from "@/components/Icons";
import { useForm } from "react-hook-form";

function Account() {
  const { control } = useForm();

  return (
    <View>
      <FormContainer>
        <TextField label="Nome" />
        <TextField<any>
          label="Usuário"
          rightIcon={{
            icon: <User />,
          }}
        />
        <TextField label="E-mail" />
        <DateField control={control} name="birth_date" label="Data de nascimento" />
        <TextField textArea label="Bios" />
        <MainButton style={styles.button}>Salvar</MainButton>
      </FormContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default Account;

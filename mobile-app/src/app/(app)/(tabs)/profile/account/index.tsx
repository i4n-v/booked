import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextField, DateField } from "@/components/FormFields";
import { MainButton } from "@/components/Buttons";
import { Title, Divider } from "../../home/styles";
import { FormContainer } from "../security/styles";
import { ArrowBack, User } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { useLocalSearchParams, useRouter } from "expo-router";

function Account() {
  const { control } = useForm();
  const router = useRouter();
  const { userId } = useLocalSearchParams();

  const resolvedUserId = Array.isArray(userId) ? userId[0] : userId;

  const handleBackToProfile = () => {
    router.push(`/profile/${resolvedUserId}`);
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackToProfile}>
          <ArrowBack />
        </TouchableOpacity>
        <Title>Conta</Title>
      </View>
      <Divider />
      <FormContainer>
        <TextField label="Nome" />
        <TextField
          label="Usuário"
          rightIcon={{
            name: "user",
            icon: User,
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

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextField } from "@/components/FormFields";
import { MainButton } from "@/components/Buttons";
import { Title, Divider } from "../../home/styles";
import { FormContainer } from "./styles";
import { ArrowBack } from "@/components/Icons";
import { useRouter, useLocalSearchParams } from "expo-router";

function Security() {
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
        <Title>Segurança</Title>
      </View>
      <Divider />
      <FormContainer>
        <TextField password label="Senha" />
        <TextField password label="Nova Senha" />
        <TextField password label="Confirme sua senha" />
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

export default Security;

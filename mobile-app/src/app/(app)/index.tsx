import React from "react";
import { Description, DescriptionDetail, DescriptionWrapper, Form, Title, Wrapper } from "./styles";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { TextField } from "@/components/FormFields";
import { MaterialIcons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MainButton } from "@/components/Buttons";

const validations = z
  .object({
    user: z.string({ required_error: "Seu nome de usuário ou e-mail deve ser informado." }),
    password: z.string({
      required_error: "Sua senha deve ser informada.",
    }),
  })
  .required({
    user: true,
    password: true,
  });

type IAuthCredentials = z.infer<typeof validations>;

export default function index() {
  const theme = useTheme();

  const { control, handleSubmit, watch } = useForm<IAuthCredentials>({
    resolver: zodResolver(validations),
    defaultValues: {
      user: "",
      password: "",
    },
  });

  return (
    <Wrapper>
      <Form>
        <Title>Login</Title>
        <TextField
          control={control}
          name="user"
          label="Usuário"
          placeholder="Usuário"
          rightIcon={{
            icon: MaterialIcons,
            name: "person",
          }}
          required
        />
        <TextField
          control={control}
          name="password"
          label="Senha"
          placeholder="Senha"
          password
          required
        />
        <MainButton>Entrar</MainButton>
        <DescriptionWrapper>
          <Description>Não possui uma conta?</Description>
          <Link href="/(unauth)/signup">
            <TouchableOpacity activeOpacity={theme.shape.opacity}>
              <DescriptionDetail>cadastre-se agora.</DescriptionDetail>
            </TouchableOpacity>
          </Link>
        </DescriptionWrapper>
      </Form>
    </Wrapper>
  );
}

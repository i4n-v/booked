import React from "react";
import {
  Description,
  DescriptionDetail,
  DescriptionWrapper,
  Form,
  Logo,
  PositionBottomDetail,
  PositionTopDetail,
  Title,
  Wrapper,
} from "./styles";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { TextField } from "@/components/FormFields";
import { MaterialIcons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MainButton } from "@/components/Buttons";
import Animated, { SlideInLeft } from "react-native-reanimated";

const logo = require("../../../assets/images/logo-dark.png");

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

const AnimatedForm = Animated.createAnimatedComponent(Form);

export default function SignIn() {
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
      <PositionTopDetail />
      <PositionBottomDetail />
      <Logo source={logo} />
      <AnimatedForm entering={SlideInLeft}>
        <Title>Login</Title>
        <TextField
          control={control}
          name="user"
          label="Usuário/E-mail"
          rightIcon={{
            icon: MaterialIcons,
            name: "person",
          }}
          required
        />
        <TextField control={control} name="password" label="Senha" password required />
        <MainButton>Entrar</MainButton>
        <DescriptionWrapper>
          <Description>Não possui uma conta?</Description>
          <Link href="/(unauth)/signup">
            <TouchableOpacity activeOpacity={theme.shape.opacity}>
              <DescriptionDetail>Cadastre-se agora.</DescriptionDetail>
            </TouchableOpacity>
          </Link>
        </DescriptionWrapper>
      </AnimatedForm>
    </Wrapper>
  );
}

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
} from "../styles";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { DateField, TextField } from "@/components/FormFields";
import { MaterialIcons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MainButton } from "@/components/Buttons";
import Animated, { SlideInLeft } from "react-native-reanimated";

const logo = require("../../../../assets/images/logo-dark.png");

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

export default function SignUp() {
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
        <Title>
          Cadastre<DescriptionDetail>-</DescriptionDetail>se
        </Title>
        <TextField control={control} name="name" label="Nome" required />
        <DateField
          control={control}
          name="birth_date"
          label="Data de nascimento"
          placeholder="dd/mm/yyyy"
          required
        />
        <TextField control={control} name="email" label="E-mail" required />
        <TextField control={control} name="password" label="Senha" password required />
        <TextField
          control={control}
          name="confirm_password"
          label="Confirmar senha"
          password
          required
        />
        <MainButton>Cadastrar</MainButton>
        <DescriptionWrapper>
          <Description>Já possui uma conta?</Description>
          <Link href="/">
            <TouchableOpacity activeOpacity={theme.shape.opacity}>
              <DescriptionDetail>Entre agora.</DescriptionDetail>
            </TouchableOpacity>
          </Link>
        </DescriptionWrapper>
      </AnimatedForm>
    </Wrapper>
  );
}

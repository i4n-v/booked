import React from "react";
import {
  Button,
  Description,
  DescriptionDetail,
  DescriptionWrapper,
  Form,
  Logo,
  PositionBottomDetail,
  PositionTopDetail,
  Title,
  Wrapper,
} from "../sigin/styles";
import { Link, router } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { DateField, TextField } from "@/components/FormFields";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { useUser } from "@/services";
import { useMutation } from "react-query";
import IUser from "@/types/User";
import { useNotifier } from "@/hooks";
import messages from "@/config/messages";
import { matchRegex } from "@/config/regex";
import { format } from "date-fns";

const logo = require("@/../assets/images/logo-dark.png");

const validations = z
  .object({
    name: z.string({ required_error: messages.NAME_REQUIRED }),
    birth_date: z.date({
      required_error: messages.DATE_REQUIRED,
    }),
    email: z
      .string({
        required_error: messages.EMAIL_REQUIRED,
      })
      .email(messages.EMAIL_INVALID),
    password: z
      .string({
        required_error: messages.PASSWORD_REQUIRED,
      })
      .regex(matchRegex.password, messages.PASSWORD_SHAPE),
    confirm_password: z
      .string({
        required_error: messages.PASSWORD_CONFIRMATION_REQUIRED,
      })
      .regex(matchRegex.password, messages.PASSWORD_SHAPE),
  })
  .required()
  .superRefine(({ password, confirm_password }, context) => {
    if (password !== confirm_password) {
      context.addIssue({
        code: "custom",
        message: messages.PASSWORD_CONFIRMATION_MATCH,
        path: ["confirmPassword"],
      });
    }
  });

type IRegister = z.infer<typeof validations>;

const AnimatedForm = Animated.createAnimatedComponent(Form);

export default function SignUp() {
  const theme = useTheme();
  const { openNotification } = useNotifier();
  const { createUser } = useUser();

  const postUserMutation = useMutation(createUser);

  const { control, handleSubmit } = useForm<IRegister>({
    resolver: zodResolver(validations),
  });

  const onSubmit = handleSubmit((values) => {
    const data: IUser<"CREATE"> = {
      ...values,
      birth_date: format(values.birth_date, "yyyy-MM-dd"),
    };

    postUserMutation.mutate(data, {
      onSuccess(response) {
        router.navigate("/sigin");
        openNotification({ status: "success", message: response.message });
      },
      onError(error: any) {
        openNotification({ status: "error", message: error.message });
      },
    });
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
        <DateField control={control} name="birth_date" label="Data de nascimento" required />
        <TextField control={control} name="email" label="E-mail" required />
        <TextField control={control} name="password" label="Senha" password required />
        <TextField
          control={control}
          name="confirm_password"
          label="Confirmar senha"
          password
          required
        />
        <Button loading={postUserMutation.isLoading} onPress={onSubmit}>
          Cadastrar
        </Button>
        <DescriptionWrapper>
          <Description>Já possui uma conta?</Description>
          <Link href="/sigin">
            <TouchableOpacity activeOpacity={theme.shape.opacity}>
              <DescriptionDetail>Entre agora.</DescriptionDetail>
            </TouchableOpacity>
          </Link>
        </DescriptionWrapper>
      </AnimatedForm>
    </Wrapper>
  );
}

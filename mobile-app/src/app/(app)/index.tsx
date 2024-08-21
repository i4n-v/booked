import React, { useContext } from "react";
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
} from "./styles";
import { Link, router } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { TextField } from "@/components/FormFields";
import { MaterialIcons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { useNotifier } from "@/hooks";
import { useAuth } from "@/services";
import { useMutation } from "react-query";
import { AuthContext } from "@/contexts/AuthContext";

const logo = require("../../../assets/images/logo-dark.png");

const validations = z
  .object({
    user_login: z.string({ required_error: "Seu nome de usuário ou e-mail deve ser informado." }),
    password: z.string({
      required_error: "Sua senha deve ser informada.",
    }),
  })
  .required();

type IAuthCredentials = z.infer<typeof validations>;

const AnimatedForm = Animated.createAnimatedComponent(Form);

export default function SignIn() {
  const theme = useTheme();
  const { openNotification } = useNotifier();
  const { setUser, setToken } = useContext(AuthContext)!;

  const { login } = useAuth();
  const loginMutation = useMutation(login);

  const { control, handleSubmit } = useForm<IAuthCredentials>({
    resolver: zodResolver(validations),
    defaultValues: {
      user_login: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    loginMutation.mutate(values, {
      onSuccess({ token, ...user }) {
        setToken(token);
        setUser(user);
        router.navigate("/home");
        openNotification({ status: "success", message: "Autenticado com sucesso!" });
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
        <Title>Login</Title>
        <TextField
          control={control}
          name="user_login"
          label="Usuário/E-mail"
          rightIcon={{
            icon: MaterialIcons,
            name: "person",
          }}
          required
        />
        <TextField control={control} name="password" label="Senha" password required />
        <Button loading={loginMutation.isLoading} loadingText="entrando" onPress={onSubmit}>
          Entrar
        </Button>
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

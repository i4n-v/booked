import { Button, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Input from "../../components/Input";
import useNotifier from "../../helpers/Notify";
import { yupResolver } from "@hookform/resolvers/yup";
import IUser from "../../commons/IUser";
import useAuth from "../../services/useAuth";
import schema from "./validation";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { AuthActionsKind } from "../../contexts/AuthContext/types";
import { AsideBackground, FormContainer, SignInContainer } from "./styles";
import Message from "../../helpers/messages";
import Cookies from "js-cookie";
import ImageBlur from "../../components/ImageBlur";
import loginBg from "../../assets/IMG/login-bg.jpg";
import imageHashs from "../../assets/IMG/imageHashs";

export default function SignIn() {
  const methods = useForm<IUser<"LOGIN">>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
    defaultValues: {
      password: "",
      user_login: "",
    },
  });
  const { login } = useAuth();
  const notify = useNotifier();
  const createUserMutation = useMutation({
    mutationFn: login,
    mutationKey: "Login",
  });
  const [, authDispatch] = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = methods.handleSubmit((value: IUser<"LOGIN">) => {
    createUserMutation.mutate(value, {
      onSuccess: ({ token, ...data }) => {
        notify(Message.SUCCESS_LOGIN);
        Cookies.set("x-access-token", token);
        authDispatch({
          type: AuthActionsKind.SET_USER_DATA,
          payload: { userData: data },
        });

        navigate("/");
      },
      onError: (err: any) => {
        notify(err.message, "error");
      },
    });
  });

  return (
    <SignInContainer>
      <AsideBackground>
        <ImageBlur src={loginBg} hash={imageHashs.login} />
      </AsideBackground>
      <FormContainer>
        <Typography component="h1">Login</Typography>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <Input name="user_login" label="Usuário/E-mail" />
            <Input name="password" type={"password"} label="Senha" />
            <Typography>
              Ainda não possui uma conta?{" "}
              <Typography component={"span"}>
                <Link to={"/register"}>cadastre-se agora </Link>
              </Typography>
              e explore um mundo inteiro.
            </Typography>
            <Button variant="contained" type={"submit"}>
              ENTRAR
            </Button>
          </form>
        </FormProvider>
      </FormContainer>
    </SignInContainer>
  );
}

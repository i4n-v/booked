import { Button, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Input from "../../components/Input";
import useNotifier from "../../helpers/Notify";
import useUser from "../../services/useUser";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./validation";
import IUser from "../../commons/IUser";
import { Link, useNavigate } from "react-router-dom";
import { AsideBackground, FormContainer, SignUpContainer } from "./styles";

export default function SignUp() {
  const methods = useForm<IUser<"CREATE">>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
    defaultValues: {
      birth_date: undefined,
      confirm_password: '',
      email: '',
      name: '',
      password: ''
    }
  });
  const { createUser } = useUser();
  const notify = useNotifier();
  const createUserMutation = useMutation({
    mutationFn: createUser,
    mutationKey: "Create User",
  });
  const navigate = useNavigate();

  const onSubmit = methods.handleSubmit((value: IUser<"CREATE">) => {
    value.birth_date = new Date();
    createUserMutation.mutate(value, {
      onSuccess: (data) => {
        notify(data.message);
        navigate("/login");
      },
      onError: (error: any) => {
        notify(error.message, "error");
      },
    });
  });

  return (
    <SignUpContainer>
      <AsideBackground />
      <FormContainer>
        <Typography component="h1">
          Cadastre
          <Typography component="span">-</Typography>
          se
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <Input name="name" label="Nome" />
            <Input name="birth_date" type={"date"} label="Data" />
            <Input name="email" label="E-mail" />
            <Input name="password" type={"password"} label="Senha" />
            <Input
              name="confirm_password"
              type={"password"}
              label="Confirmar senha"
            />
            <Typography>
              Já possui uma conta?{" "}
              <Typography
                component={"span"}
                sx={{
                  color: (t) => t.palette.primary.main,
                  font: (t) => t.font.xs,
                }}
              >
                <Link to={"/login"}>entre e descubra novas experiências.</Link>
              </Typography>
            </Typography>
            <Button variant="contained" type={"submit"}>
              CADASTRAR-SE
            </Button>
          </form>
        </FormProvider>
      </FormContainer>
    </SignUpContainer>
  );
}

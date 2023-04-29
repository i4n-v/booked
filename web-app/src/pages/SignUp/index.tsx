import { Box, Button, Grid, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import registerBg from "../../assets/IMG/register-bg.png";
import Input from "../../components/Input";
import useNotifier from "../../helpers/Notify";
import useUser from "../../services/useUser";
import { yupResolver } from '@hookform/resolvers/yup'
import schema from "./validation";
import IUser from "../../commons/IUser";
import { Link } from "react-router-dom";

export default function SignUp() {
  const methods = useForm<IUser<"CREATE">>({
    resolver: yupResolver(schema),
    reValidateMode: 'onSubmit'
  });
  const { createUser } = useUser();
  const notify = useNotifier();
  const createUserMutation = useMutation({
    mutationFn: createUser,
    mutationKey: "Create User",
  });

  const onSubmit = methods.handleSubmit((value: IUser<"CREATE">) => {
    value.birth_date = new Date();
    createUserMutation.mutate(value, {
      onSuccess: () => {
        notify("Sucesso");
      },
      onError: (error: any) => {
        notify(error.message, 'error')
      }
    });
  });

  return (
    <Grid xs={12} container item flexGrow={2}>
      <Grid xs={6} item height="auto">
        <Box height={'auto'} sx={{
          minHeight: "100vh",
          backgroundImage: `url(${registerBg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPositionY: "center",
          clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
          filter: 'brightness(50%)'
        }} />
      </Grid>
      <Grid xs={6} item display={'flex'} flexDirection={'column'} height="auto" alignContent={'center'} padding={'150px 200px'}>
        <Typography sx={{ font: (t) => t.font.lg, textAlign: "start", mb: 4 }}>
          Cadastre-se
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '30px'
          }}>
            <Input name="name" label="Nome" />
            <Input name="birth_date" type={'date'} label="Data" />
            <Input name="email" label="E-mail" />
            <Input name="password" type={'password'} label="Senha" />
            <Input name="confirm_password" type={'password'} label="Confirmar senha" />
            <Typography sx={{ font: (t) => t.font.xs }}>
              Já possui uma conta?{" "}
              <Typography
                component={"span"}
                sx={{
                  color: (t) => t.palette.primary.main,
                  font: (t) => t.font.xs,
                }}
              >
                <Link to={'/login'}>
                  entre e descubra novas experiências.
                </Link>
              </Typography>
            </Typography>
            <Button
              variant="contained"
              fullWidth={false}
              type={"submit"}
              sx={{ width: "35%", height: "44px", font: (t) => t.font.xs }}
            >
              CADASTRAR-SE
            </Button>

          </form>
        </FormProvider>

      </Grid>
    </Grid>
  );
}

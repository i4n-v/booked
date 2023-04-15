import { Box, Button, Grid, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import registerBg from "../../assets/IMG/register-bg.png";
import Input from "../../components/Input";
import useNotifier from "../../helpers/Notify";
import { yupResolver } from '@hookform/resolvers/yup'
import IUser from "../../commons/IUser";
import useAuth from "../../services/useAuth";
import schema from "./validation";
import { Link } from "react-router-dom";

export default function SignIn() {
    const methods = useForm<IUser<"LOGIN">>({
        resolver: yupResolver(schema),
        reValidateMode: 'onSubmit'
    });
    const { login } = useAuth();
    const notify = useNotifier();
    const createUserMutation = useMutation({
        mutationFn: login,
        mutationKey: "Login",
    });

    const onSubmit = methods.handleSubmit((value: IUser<"LOGIN">) => {
        createUserMutation.mutate(value, {
            onSuccess: () => {
                notify("Sucesso");
            },
            onError: (err: any) => {
                notify(err.message, 'error')
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
            <Grid xs={6} item display={'flex'} flexDirection={'column'} height="auto" alignContent={'center'} padding={'200px 200px'}>
                <Typography sx={{ font: (t) => t.font.lg, textAlign: "start", mb: 4 }}>
                    Login
                </Typography>
                <FormProvider {...methods}>
                    <form onSubmit={onSubmit} >
                        <Box display={"grid"} rowGap={3}>
                            <Input name="email" label="E-mail" />
                            <Input name="password" type={'password'} label="Senha" />
                            <Typography sx={{ font: (t) => t.font.xs }}>
                                Ainda não possui uma conta?{" "}
                                <Typography
                                    component={"span"}
                                    sx={{
                                        color: (t) => t.palette.primary.main,
                                        font: (t) => t.font.xs,
                                    }}
                                >
                                    <Link to={'/register'} >
                                        cadastre-se agora{" "}
                                    </Link>
                                </Typography>
                                e explore um mundo inteiro.
                            </Typography>
                            <Button
                                variant="contained"
                                fullWidth={false}
                                type={"submit"}
                                sx={{ width: "35%", height: "44px", font: (t) => t.font.xs }}
                            >
                                ENTRAR
                            </Button>
                        </Box>
                    </form>
                </FormProvider>
            </Grid>
        </Grid>
    );
}

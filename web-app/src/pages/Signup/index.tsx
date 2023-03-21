import { Box, Button, Grid, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import registerBg from "../../assets/IMG/register-bg.png";
import Input from "../../components/Input";

export default function SignUp() {
  const methods = useForm({
    defaultValues: {
      name: "",
      birth_date: "",
      email: "",
      password: "",
    },
  });

  return (
    <Grid xs={12} container item flexGrow={2}>
      <Grid xs={6} item height='auto' >
        <Box height={'auto'} sx={{
          minHeight: "100vh",
          backgroundImage: `url(${registerBg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPositionY: "center",
          clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
          filter: 'brightness(50%)'
        }}>
        </Box>
      </Grid>
      <Grid xs={6} item padding="6% 6% 4% 6%" height="100%">
        <Typography sx={{ font: (t) => t.font.lg, textAlign: "start", mb: 4 }}>
          Cadastre-se
        </Typography>
        <FormProvider {...methods}>
          <Box display={"grid"} rowGap={3}>
            <Input name="name" label="Nome" />
            <Input name="birth_date" label="Data" />
            <Input name="email" label="E-mail" />
            <Input name="password" label="Senha" />
            <Typography sx={{ font: (t) => t.font.xs }}>
              Já possui uma conta? <Typography component={'span'} sx={{color: (t) => t.palette.primary.main,font: (t) => t.font.xs}}>entre e descubra novas experiências.</Typography>
            </Typography>
            <Button variant="contained" fullWidth={false} sx={{width: '35%',height: '44px', font: (t) => t.font.xs}}>CADASTRAR-SE</Button>
          </Box>
        </FormProvider>
      </Grid>
    </Grid>
  );
}

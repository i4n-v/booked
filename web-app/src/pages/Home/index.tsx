import { Button, Grid, } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

import Input from "../../components/Input";
import useNotifier from "../../helpers/Notify";

export default function Home() {
  const methods = useForm({
    defaultValues: {
      name: ''
    }
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <FormProvider {...methods} >
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container xs={12}>
          <Grid item xs={6}>
            <Input name={'name'} label={"Nome"} />
          </Grid>
          <Grid item xs={6}>
            <input type="submit" />

          </Grid>

        </Grid>
      </form>
    </FormProvider>
  );
}
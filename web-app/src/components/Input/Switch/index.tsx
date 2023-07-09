import {
  FormControlLabel,
  Switch as MUISwitch,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function Switcha({ name, label }: any) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControlLabel
          sx={{ display: "flex", justifyContent: "start" }}
          control={<MUISwitch {...field} defaultChecked />}
          label={
            <Typography
              sx={{
                font: (t) => t.font.sm,
                color: (t) =>
                  errors?.[name]
                    ? t.palette.error.main
                    : t.palette.secondary[800],
              }}
            >
              {label}
            </Typography>
          }
          labelPlacement="start"
        />
      )}
    ></Controller>
  );
}

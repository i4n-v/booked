import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { InputProps } from "./types";

export default function Input({ name ,label}: InputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <TextField 
      {...field}
      label={label}
      error = {!!errors}
      fullWidth
      />}
    />
  );
}

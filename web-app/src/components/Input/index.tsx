import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { InputProps } from "./types";

export default function Input({ name ,label,icon}: InputProps) {
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
      error = {!errors}
      InputProps={{
        startAdornment: icon?.left,
        endAdornment: icon?.right
      }}
      fullWidth
      />}
    />
  );
}

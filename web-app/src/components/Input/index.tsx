import { Box, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { InputProps } from "./types";
import { useState } from "react";
import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";
export default function Input({
  name,
  label,
  type,
  icon,
  shrink,
  ...props
}: InputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [input_type, setType] = useState(type);
  const Visibility = () => {
    const changeVisibility = () => {
      if (input_type === "password") {
        setType("text");
      } else {
        setType("password");
      }
    };

    return (
      <Box
        sx={{ cursor: "pointer" }}
        display={"flex"}
        alignItems={"center"}
        onClick={() => changeVisibility()}
      >
        {input_type === "text" ? (
          <RemoveRedEye color="primary" />
        ) : (
          <VisibilityOff color="primary" />
        )}
      </Box>
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          type={input_type}
          error={!!errors[name]}
          helperText={errors[name]?.message as string}
          InputProps={{
            startAdornment: icon?.left,
            endAdornment: icon?.right ? (
              icon?.right
            ) : type === "password" ? (
              <Visibility />
            ) : null,
          }}
          InputLabelProps={{ shrink }}
          fullWidth
          autoComplete="off"
          {...props}
        />
      )}
    />
  );
}

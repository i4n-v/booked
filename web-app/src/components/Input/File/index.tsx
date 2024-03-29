import { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, FormHelperText, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useFormContext, Controller } from "react-hook-form";
import { Ellipse } from "../../../assets/SVG";
import { CloudUpload } from "@mui/icons-material";
import { InputFileProps } from "./types";

const Input = styled("input")({
  display: "none",
});

const InputFile = ({
  name,
  button,
  accept = ".png, .jpg, .jpeg",
  label,
  hiddeFileName = false,
  customIcon,
  disabled
}: InputFileProps) => {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>();

  useEffect(() => {
    register(name);
  }, [register, name]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setValue(name, file);
      };
      reader.readAsDataURL(file);
    } else {
      setValue(name, null);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={null}
      render={({ field }) => (
        <>
          <Input
            accept={accept}
            id={name}
            type="file"
            onChange={handleFileChange}
            disabled={disabled}
          />
          <label htmlFor={name} style={{ borderRadius: "50%" }}>
            {!button ? (
              <Box
                component="div"
                sx={{
                  borderRadius: "50%",
                  width: "100%",
                  height: "100%",
                  minWidth: "0",
                  padding: "0",
                  backgroundColor: preview ? "#eee" : "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: (t) => t.palette.primary.main,
                  cursor: disabled ? "default" : "pointer",
                  "&:hover": {
                    opacity: 0.8,
                  },
                  "& img": {
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                    display: field.value ? "block" : "none",
                  },
                  "& svg": {
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    display: field.value ? "none" : "block",
                  },
                }}
              >
                {preview || field.value ? (
                  <img src={preview || field.value} alt="Selected Preview" />
                ) : (
                  <Ellipse />
                )}
              </Box>
            ) : (
              <Box>
                <Button
                  component="span"
                  disabled={disabled}
                  sx={{
                    height: "48px",
                    userSelect: "none",
                    font: (t) => t.font.xs,
                    width: "100%",
                    maxWidth: "100%",
                  }}
                  color={!!errors[name] ? "error" : "primary"}
                  variant={field.value ? "contained" : "outlined"}
                >
                  {customIcon ? customIcon : <CloudUpload />}
                  {label}
                </Button>
                {field.value && !hiddeFileName ? (
                  <Typography
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      font: (t) => t.font.xs,
                      paddingTop: "4px",
                      color: (t) => t.palette.secondary[800],
                    }}
                  >
                    {field.value.name}
                  </Typography>
                ) : null}
              </Box>
            )}
          </label>
          <FormHelperText sx={{ textAlign: "center" }} error={!!errors[name]}>
            <>{errors[name]?.message}</>
          </FormHelperText>
        </>
      )}
    />
  );
};

export default InputFile;

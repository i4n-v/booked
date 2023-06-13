import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function InputRadio({ name, options, description, onChange }: any) {
    const { control, register, setValue, formState: { errors }, watch } = useFormContext();
    useEffect(() => {
        register(name);
    }, [register, name]);

    useEffect(() => {
        onChange(watch(name))
    }, [name, onChange, watch])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        if (["true", "false"].includes(value)) {
            setValue(name, value === "true")
            return
        }
        setValue(name, value)
    }
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormControl error={!!errors[name]}>
                    <FormLabel sx={{ font: t => t.font.xs, fontWeight: 500 }} >{description}</FormLabel>
                    <RadioGroup
                        {...field}
                        row
                        sx={{
                            font: t => t.font.xs, paddingTop: '6px',
                        }}
                        onChange={handleChange}
                    >
                        {options?.map(({ value, label }: any, index: number) => (
                            <FormControlLabel
                                value={value}
                                key={`radio-${index}`}
                                sx={{
                                    marginRight: '12px',
                                }}
                                control={<Radio name={name} sx={{
                                    '& .MuiSvgIcon-root': {
                                        font: t => t.font.xs,
                                    },
                                    color: t => !!errors[name]
                                        ? t.palette.error.main
                                        : t.palette.primary.light,

                                    paddingRight: '4px',
                                    height: '18px',
                                }} />}
                                label={
                                    <Typography sx={{
                                        font: t => t.font.xs,
                                        fontWeight: 500,
                                        color: t => !!errors[name] ? t.palette.error.main : t.palette.secondary[800]
                                    }}>
                                        {label}
                                    </Typography>
                                } />
                        ))}
                    </RadioGroup>
                </FormControl>

            )}
        ></Controller>
    )
}
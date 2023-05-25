import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function InputRadio({ name, options, description }: any) {
    const { control, register, setValue } = useFormContext();
    useEffect(() => {
        register(name);
    }, [register, name]);


    const onChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
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
            render={() => (
                <FormControl >
                    <FormLabel sx={{ font: t => t.font.xs, fontWeight: 500 }} >{description}</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        sx={{ font: t => t.font.xs, paddingTop: '6px' }}
                        onChange={onChange}
                    >
                        {options?.map(({ value, label }: any, index: number) => (
                            <FormControlLabel
                                value={value}
                                key={`radio-${index}`}
                                sx={{ marginRight: '12px' }}
                                control={<Radio color="primary" sx={{
                                    '& .MuiSvgIcon-root': {
                                        font: t => t.font.xs,
                                    },
                                    paddingRight: '4px',
                                    height: '18px',
                                }} />}
                                label={
                                    <Typography sx={{ font: t => t.font.xs, fontWeight: 500, color: t => t.palette.secondary[800] }}>
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
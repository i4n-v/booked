import React, { CSSProperties, ChangeEvent, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { SxProps, Theme, styled } from '@mui/material/styles';
import { useFormContext, Controller } from 'react-hook-form';
import { Add, AddCircleOutline, AddRoadOutlined, AddRounded } from '@mui/icons-material';
import { Ellipse } from '../../assets/SVG';

const Input = styled('input')({
    display: 'none',
});

interface ImageInputProps {
    name: string;
}

const ImageInput = ({ name }: ImageInputProps) => {
    const { control, register, setValue } = useFormContext();

    useEffect(() => {
        register(name);
    }, [register, name]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue(name, reader.result);
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
                        accept="image/*"
                        id={name}
                        type="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor={name} style={{ borderRadius: "50%" }}>
                        <Box
                            component="div"
                            sx={{
                                borderRadius: '50%',
                                width: "100%",
                                height: "100%",
                                minWidth: '0',
                                padding: '0',
                                backgroundColor: field.value ? '#eee' : '#fff',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: (t) => t.palette.primary.main,
                                cursor: 'pointer',
                                '&:hover': {
                                    opacity: 0.8,
                                },
                                '& img': {
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    display: field.value ? 'block' : 'none',
                                },
                                '& svg': {
                                    width: "100%",
                                    height: '100%',
                                    borderRadius: '50%',
                                    display: field.value ? 'none' : 'block',
                                },
                            }}
                        >
                            {field.value ? (
                                <img src={field.value} alt="Selected Preview" />
                            ) : <Ellipse />}
                        </Box>
                    </label>
                </>
            )}
        />
    );
};

export default ImageInput;

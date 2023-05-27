import { Autocomplete, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import Input from "..";
import { ChangeEvent, useEffect, useState } from "react";
import { InputSelectProps } from "./type";
import { useQuery } from "react-query";
import { IWrapper } from "../../../commons/IWrapper";
import useDebounce from "../../../helpers/Debounce";

export default function InputSelect<T>({ name, options, optionLabel, label, multiple, service }: InputSelectProps<T>) {
    const { control, register, setValue } = useFormContext();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [optionsFromService,setOptionsFromService] = useState<T[]>([]);
    const debouncedRefetch = useDebounce(() => Service.refetch(), 200)
    const Service = useQuery(
        `select-${name}`,
        () => service ? service({ page, limit }) : null,
        {
            retry: false,
            refetchOnWindowFocus: false,
            onSuccess: ({items}: IWrapper<T>) => {
                page == 1 
                ? setOptionsFromService(items)
                : setOptionsFromService( curr => [...curr, ...items])
            }
        }
    )

    useEffect(() => {
        register(name);
    }, [register, name]);

    const handleChange = (_event: any, value: any) => {
        setValue(name, value)
    };

    const handleScroll = (target : EventTarget & HTMLUListElement) => {
        if (target.scrollTop + target.clientHeight >= target.scrollHeight - 2) {
            if (page < (Service.data?.totalPages || 0) && !Service.isFetching) {
                setPage(page + 1);
            }
        }
    };
    useEffect(() => {
        debouncedRefetch()
    },[page])

    const config = {
        multiple,
        options: options || Service.data?.items || [],
    }
    return (
        <Controller control={control} name={name} render={({ field }) => (
            <Autocomplete
                {...field}
                {...config}
                ListboxProps={{
                    style: { maxHeight: "200px" },
                    onScrollCapture: ({currentTarget}) => handleScroll(currentTarget),
                }}
                onClose={() => setPage(1)}
                onOpen={() => debouncedRefetch()}
                getOptionLabel={(option) => option[optionLabel] as string}
                onChange={handleChange}
                renderInput={(params) => (
                    <Input  {...params} variant="outlined" name={name} label={label} />
                )}
            />
        )} />


    )
}
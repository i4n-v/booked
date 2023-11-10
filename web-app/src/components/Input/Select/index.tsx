/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import Input from "..";
import { useCallback, useEffect, useState } from "react";
import { InputSelectProps, InputSelectServiceFilter } from "./type";
import { useQuery } from "react-query";
import { IWrapper } from "../../../commons/IWrapper";
import useDebounce from "../../../helpers/Debounce";

export default function InputSelect<T>({ name, options, optionLabel, label, multiple, service, valueKey }: InputSelectProps<T>) {
    const { control, register, setValue, formState: { errors } } = useFormContext();
    const [filter, setFilter] = useState<InputSelectServiceFilter>({ limit: 10, page: 0 })
    const [optionsFromService, setOptionsFromService] = useState<T[]>([]);
    const debouncedRefetch = useCallback(useDebounce(() => Service.refetch(), 200), [filter])
    const Service = useQuery(
        `select-${name}`,
        () => service && filter.page ? service(filter) : null,
        {
            retry: false,
            refetchOnWindowFocus: false,
            onSuccess: (data: IWrapper<T>) => {
                if (!data) return
                data?.current === 1
                    ? setOptionsFromService(data?.items)
                    : setOptionsFromService(curr => [...curr, ...data?.items || []])
            },
        }
    )

    useEffect(() => {
        register(name);
    }, [register, name]);

    const handleChange = (_event: any, value: any) => {
        if (valueKey) {
            setValue(name, value.map((i: any) => i[valueKey]))
        } else {
            setValue(name, value)
        }
    };

    const handleScroll = useCallback((target: EventTarget & HTMLUListElement) => {
        if (target.scrollTop + target.clientHeight >= target.scrollHeight - 2) {
            if (filter.page < (Service.data?.totalPages || 0) && !Service.isFetching) {
                setFilter({ ...filter, page: (filter.page + 1) });
            }
        }
    }, [optionsFromService]);

    const handleFilter: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined = useDebounce(({ target }) => {
        setFilter(curr => ({ ...curr, [optionLabel]: target.value, page: 1 }))
    }, 200)

    const onOpen = useCallback(() => {
        setOptionsFromService([])
        setFilter(curr => ({ limit: curr.limit, page: 1 }))
    }, [filter.page])

    useEffect(() => {
        debouncedRefetch()
    }, [filter, debouncedRefetch])

    const config = {
        multiple,
        options: options || optionsFromService || [],
    }
    return (
        <Controller control={control} name={name} render={({ field }) => (
            <Autocomplete
                {...field}
                {...config}
                ListboxProps={{
                    style: { maxHeight: "200px" },
                    onScrollCapture: ({ currentTarget }) => handleScroll(currentTarget),
                }}
                onOpen={onOpen}
                isOptionEqualToValue={(option: T, value: T) => option[optionLabel] === value[optionLabel]}
                getOptionLabel={(option) => option[optionLabel] as string}
                noOptionsText={Service.isFetching ? `Solicitando ${label}...` : `Nenhum (a) ${label} encontradas(os)`}
                onChange={handleChange}
                renderInput={(params) => (
                    <Input error={!!errors[name]}  {...params} onChange={handleFilter} variant="outlined" name={name} label={label} />
                )}
            />
        )} />


    )
}
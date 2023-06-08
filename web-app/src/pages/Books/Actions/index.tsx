import { Tune } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { Actions } from "../styles";
import { BooksActionsProps, BooksFilters } from "./types";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../../components/Input";
import InputSelect from "../../../components/Input/Select";
import { useCallback, useEffect, useState } from "react";
import { useQueries } from "react-query";
import useCategory from "../../../services/useCategory";
import useDebounce from "../../../helpers/Debounce";

export default function BooksActions(
    {
        filter,
        publish,
        handleOpenPublish = (v: true) => null,
        handleFilter = (v: true) => null,
    }: BooksActionsProps
) {
    const [showFilters,setShowFilters] = useState(false)
    const form = useForm<BooksFilters>({
        defaultValues:{
            categories: [],
            max_date: '',
            min_date: ''
        }
    });
    const debounceSearch = useDebounce(handleFilter,700)
    const { getCategories } = useCategory()

    const formValues = form.watch()

    const search = useCallback(debounceSearch,[formValues])
    useEffect(() => {
        search(formValues)
    },[formValues.categories,formValues.max_date, formValues.min_date])
    return (
        <Actions showfilters={!!showFilters}>
            <Box>
                {filter ? <Button sx={{
                    height: '42px',
                    color: (t) => t.palette.secondary.main,
                    display: 'flex',
                    font: (t) => t.font.xs,
                    columnGap: '8px',
                    padding: '1px'
                }}
                    onClick={() => setShowFilters(curr => !curr)}
                >
                    <Tune color="primary" fontSize={'large'} />
                    Filtros
                </Button> : null}
                {publish ? <Button sx={{ height: '42px' }} onClick={() => handleOpenPublish(true)} variant="contained">Publicar</Button> : null}
            </Box>
            <FormProvider {...form}>
                <form >
                    <Input type="date" name="min_date" label="Data minima da publicação" shrink/>
                    <Input type="date" name="max_date" label="Data máxima   da publicação" shrink/>
                    <InputSelect service={getCategories} name="categories" optionLabel={'name'} label="Categorias" multiple />
                </form>
            </FormProvider>
        </Actions>
    )
}
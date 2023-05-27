import { FormProvider, useForm } from "react-hook-form";
import { FormContainer } from "./styles";
import { Box, Button, Grid } from "@mui/material";
import { useState } from "react";
import { BooksFormProps } from "./types";
import Page from "../../../components/Dialog";
import Input from "../../../components/Input";
import InputRadio from "../../../components/Input/Radio";
import InputFile from "../../../components/Input/File";
import InputSelect from "../../../components/Input/Select";
import useCategory from "../../../services/useCategory";
import { useQuery } from "react-query";

export default function BooksForm({ handleClose, open }: BooksFormProps) {
    const form = useForm<{ test: boolean }>({})
    const {getCategories} = useCategory()
    const onSubmit = form.handleSubmit((value) => {
        console.log((value))
    })
    return (
        <Page
            open={open}
            width={980}
            height={488}
            onClose={() => handleClose(false)}
            title="Publicar novo livro"
        >
            <FormProvider {...form}>
                <form onSubmit={onSubmit}>
                    <Grid item container xs={12} gap={2}>
                        <Grid item xs={6}>
                            <Input name="name" label={"Nome"} />
                        </Grid>
                        <Grid item xs={2} justifyContent={'center'} display={'flex'}>
                            <InputRadio name="free" options={[{ label: 'Sim', value: true }, { label: 'Não', value: false }]} description={"O livro é gratuito ?"} />
                        </Grid>
                        <Grid item xs={3.5}>
                            <Input name="price" label={"Preço"} />
                        </Grid>
                        <Grid item xs={12}>
                            <InputSelect service={getCategories}  name="category" optionLabel={'name'} label="Categorias" multiple  />
                        </Grid>
                        <Grid item xs={12}>
                            <Input name="description" label={"Descrição"} maxRows={6} minRows={6} multiline />
                        </Grid>
                        <Grid item xs={5}>
                            <InputFile name="cover" button label={'SELECIONE A IMAGEM DE CAPA'} />
                        </Grid>
                        <Grid item xs={5}>
                            <InputFile name="book" button label={'SELECIONE O ARQUIVO DO LIVRO'} accept="application/pdf" />
                        </Grid>
                        <Grid item xs={2}>
                            <Button sx={{ height: '42px' }} type="submit" variant="contained">PUBLICAR</Button>
                        </Grid>
                    </Grid>
                </form>
            </FormProvider>
        </Page>
    )
}
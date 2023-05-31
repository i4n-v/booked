import { FormProvider, useForm } from "react-hook-form";
import { Button, Grid } from "@mui/material";
import { BooksFormProps } from "./types";
import Page from "../../../components/Dialog";
import Input from "../../../components/Input";
import InputRadio from "../../../components/Input/Radio";
import InputFile from "../../../components/Input/File";
import InputSelect from "../../../components/Input/Select";
import useCategory from "../../../services/useCategory";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./validation";
import IBook from "../../../commons/IBook";
import { useMutation } from "react-query";
import useBook from "../../../services/useBook";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import useNotifier from "../../../helpers/Notify";

export default function BooksForm({ handleClose, open }: BooksFormProps) {
    const { createBook } = useBook()
    const createMutation = useMutation(createBook)
    const [authData] = useContext(AuthContext)
    const notify = useNotifier()
    const form = useForm<IBook<"CREATE">>({
        resolver: yupResolver(schema),
        reValidateMode: "onSubmit",
        defaultValues: {
            categories: [],
            description: '',
            file: undefined,
            free: true,
            name: '',
            photo: undefined,
            price: 0,
            user_id: undefined
        }
    })
    const { getCategories } = useCategory()
    const onSubmit = form.handleSubmit((value) => {
        createMutation.mutate({ ...value, user_id: authData?.userData?.id as string }, {
            onSuccess(data) {
                form.reset()
                notify(data.message)
            },
            onError(error: any) {
                notify(error.message, 'error')
            },
        })
    })
    return (
        <Page
            open={open}
            width={980}
            minHeight={488}
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
                            <InputRadio name="free" onChange={(v: boolean) => { if (v) form.setValue('price', 0) }} options={[{ label: 'Sim', value: true }, { label: 'Não', value: false }]} description={"O livro é gratuito ?"} />
                        </Grid>
                        <Grid item xs={3.5}>
                            <Input name="price" label={"Preço"} disabled={form.watch('free')} type="number" icon={{ left: <span style={{ paddingRight: 3 }}>R$</span> }} />
                        </Grid>
                        <Grid item xs={12}>
                            <InputSelect service={getCategories} name="categories" optionLabel={'name'} label="Categorias" multiple />
                        </Grid>
                        <Grid item xs={12}>
                            <Input name="description" label={"Descrição"} maxRows={6} minRows={6} multiline />
                        </Grid>
                        <Grid item xs={5}>
                            <InputFile name="photo" button label={'SELECIONE A IMAGEM DE CAPA'} />
                        </Grid>
                        <Grid item xs={5}>
                            <InputFile name="file" button label={'SELECIONE O ARQUIVO DO LIVRO'} accept="application/pdf" />
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
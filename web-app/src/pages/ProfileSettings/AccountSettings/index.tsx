import { Box, Button, Typography } from "@mui/material";
import { AccountSettingsContainer, InputArea, InputAreaItem, PhotoInputArea, PhotoInputContainer } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import ImageInput from "../../../components/InputImage";
import Input from "../../../components/Input";
import { User } from "../../../assets/SVG";
import useUser from "../../../services/useUser";
import { useMutation, useQuery } from "react-query";
import useNotifier from "../../../helpers/Notify";
import IUser from "../../../commons/IUser";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { ResponseMessage } from "../../../commons/ResponseMessage";
import { AuthActionsKind } from "../../../contexts/AuthContext/types";

export default function AccountSettings() {
    const { updateUser, getUser } = useUser();
    const updateMutation = useMutation(updateUser)
    const notify = useNotifier()
    const [authData, authDispatch] = useContext(AuthContext)
    const form = useForm<IUser<"UPDATE">>()
    const user = useQuery('get-user', () => getUser(authData?.userData?.id), {
        onSuccess: ({ birth_date, photo_url, ...data }) => {
            form.reset({ ...data, birth_date: new Date(birth_date)?.toISOString().substr(0, 10), photo: photo_url })
        },
        retry: false,
        refetchOnWindowFocus: false
    })
    const onSubmit = form.handleSubmit((formData) => {
        formData.id = authData?.userData?.id;
        updateMutation.mutate(formData, {
            onSuccess: (data: ResponseMessage) => {
                const { id, email, user_name } = formData
                authDispatch({ type: AuthActionsKind.SET_USER_DATA, payload: { userData: { id, email, user_name } } })
                notify(data.message)
            },
            onError: (error: any) => {
                notify(error.message, 'error')
            }
        })
    })

    return (
        <FormProvider {...form}>
            <AccountSettingsContainer onSubmit={onSubmit}>
                <PhotoInputContainer>
                    <PhotoInputArea>
                        <ImageInput name="photo" />
                    </PhotoInputArea>
                    <Typography sx={{
                        color: (t) => t.palette.primary[700],
                        font: (t) => t.font.xs
                    }}>Editar foto de perfil</Typography>
                </PhotoInputContainer>
                <InputArea cols={2} gap={2}>
                    <InputAreaItem >
                        <Input name="name" label="Nome" />
                    </InputAreaItem>
                    <InputAreaItem >
                        <Input name="user_name" label="Usuário" icon={{ right: <User /> }} />
                    </InputAreaItem>
                    <InputAreaItem >
                        <Input name="email" label="E-mail" type="email" />
                    </InputAreaItem>
                    <InputAreaItem >
                        <Input name="birth_date" defaultValue={'26/06/1996'} label="Data de nascimento" type="date" />
                    </InputAreaItem>
                    <InputAreaItem span={2} >
                        <Input name="description" label="Bios" multiline maxRows={4} minRows={4} />
                    </InputAreaItem>
                    <Box width={'100px'}>
                        <Button type="submit" variant="contained">SALVAR</Button>
                    </Box>
                </InputArea>
            </AccountSettingsContainer>
        </FormProvider>
    )
}
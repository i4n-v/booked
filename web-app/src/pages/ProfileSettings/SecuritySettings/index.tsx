import { FormProvider, useForm } from "react-hook-form";
import { ContentContainer, InputArea, InputAreaItem } from "../styles";
import Input from "../../../components/Input";
import { Box, Button } from "@mui/material";
import { useContext } from "react";
import { PasswordChange } from "./types";
import { useMutation } from "react-query";
import useUser from "../../../services/useUser";
import { AuthContext } from "../../../contexts/AuthContext";
import useNotifier from "../../../helpers/Notify";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./validation";

export default function SecuritySettings() {
    const { passwordChange } = useUser()
    const [auth] = useContext(AuthContext)
    const notify = useNotifier()
    const passwordMutation = useMutation(passwordChange)
    const form = useForm<PasswordChange>({
        resolver: yupResolver(schema),
        reValidateMode: "onSubmit",
        defaultValues: {
            confirm_password: '',
            password: '',
            previous_password: ''
        }
    })

    const handleSubmit = form.handleSubmit((data) => {
        passwordMutation.mutate({ data, id: auth?.userData?.id as string }, {
            onSuccess: (data) => {
                notify(data.message)
                form.reset()
            },
            onError: (error: any) => {
                notify(error.message, 'error')
            }
        })
    })
    return (
        <FormProvider {...form}>
            <ContentContainer onSubmit={handleSubmit}>
                <InputArea cols={2}>
                    <InputAreaItem display={'flex'} flexDirection={'column'} rowGap={2}>
                        <Input name="previous_password" type={'password'} label="Senha" />
                        <Input name="password" type={'password'} label="Nova Senha" />
                        <Input name="confirm_password" type={'password'} label="Confirmar Senha" />
                        <Box width={'100px'}>
                            <Button type="submit" variant="contained">SALVAR</Button>
                        </Box>
                    </InputAreaItem>
                </InputArea>
            </ContentContainer>
        </FormProvider>
    )
}
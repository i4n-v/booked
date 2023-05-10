import { Box } from "@mui/material";
import { AccountSettingsContainer, InputArea, InputAreaItem, PhotoInputArea, PhotoInputContainer } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import ImageInput from "../../../components/InputImage";
import Input from "../../../components/Input";
import { User } from "../../../assets/SVG";

export default function AccountSettings() {
    const form = useForm()
    return (
        <FormProvider {...form}>
            <AccountSettingsContainer>
                <PhotoInputContainer>
                    <PhotoInputArea>
                        <ImageInput name="profile_image" />
                    </PhotoInputArea>
                </PhotoInputContainer>
                <InputArea cols={2} gap={2}>
                    <InputAreaItem >
                        <Input name="name" label="Nome" />
                    </InputAreaItem>
                    <InputAreaItem >
                        <Input name="username" label="Usuário" icon={{ right: <User /> }} />
                    </InputAreaItem>
                    <InputAreaItem >
                        <Input name="email" label="E-mail" type="email" />
                    </InputAreaItem>
                    <InputAreaItem >
                        <Input name="birth_date" label="Data de nascimento" type="date" />
                    </InputAreaItem>
                    <InputAreaItem colsSpan={2} >
                        <Input name="bios" label="Bios" />
                    </InputAreaItem>
                </InputArea>
            </AccountSettingsContainer>
        </FormProvider>
    )
}
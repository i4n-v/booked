import { Typography } from "@mui/material";
import { ConfigContainer, ConfigContent, ConfigMenu, Container } from "./styles";
import ListItems from "../../components/List";
import AccountConfig from "./AccountSettings";
import { useState } from "react";

export default function ProfileSettings() {
    const [active, setActive] = useState<number>(0)
    const ConfigContents = [
        <AccountConfig />
    ]
    return (
        <Container>
            <Typography component={'h1'}>Configurações</Typography >
            <ConfigContainer>
                <ConfigMenu>
                    <ListItems data={[{ text: 'Conta' }, { text: 'Segurança' }]} handleChange={setActive} />
                </ConfigMenu>
                <ConfigContent>
                    {ConfigContents[active]}
                </ConfigContent>
            </ConfigContainer >
        </Container>
    )
}
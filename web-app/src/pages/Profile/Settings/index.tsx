import { Typography } from "@mui/material";
import { ConfigContainer, ConfigContent, ConfigMenu } from "./styles";
import ListItems from "../../../components/List";
import AccountConfig from "./Account";
import { useState } from "react";
import SecuritySettings from "./Security";
import Content from "../../../components/Layout/Content/styles";

export default function ProfileSettings() {
    const [active, setActive] = useState<number>(0)
    const ConfigContents = [
        <AccountConfig />,
        <SecuritySettings />
    ]


    return (
        <Content>
            <Typography component={'h1'}>Configurações</Typography >
            <ConfigContainer>
                <ConfigMenu>
                    <ListItems data={[{ text: 'Conta' }, { text: 'Segurança' }]} handleChange={setActive} />
                </ConfigMenu>
                <ConfigContent>
                    {ConfigContents[active]}
                </ConfigContent>
            </ConfigContainer >
        </Content>
    )
}
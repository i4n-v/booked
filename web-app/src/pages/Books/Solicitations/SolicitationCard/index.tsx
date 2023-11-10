import { CurrencyExchange } from "@mui/icons-material";
import { SolicitationCardBadge, SolicitationCardContainer, SolicitationCardInfo } from "./styles";
import { Box, Typography, useTheme } from "@mui/material";
import MoreOptions from "../../../../components/MoreOptions";
import { useState } from "react";

export default function SolicitationCard() {
    const [openOptions, setOpenOptions] = useState(false)
    const theme = useTheme()
    const colors = {
        pending: theme.palette.primary[700],
        accept: theme.palette.success.main,
        canceled: "#FBE200",
        recused: theme.palette.error.main
    }

    const solicitations = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
        <SolicitationCardContainer>
            <Box>
                <SolicitationCardBadge bgcolor={colors["accept"]}>
                    <CurrencyExchange color="primary" />
                </SolicitationCardBadge>
            </Box>
            {
                solicitations.map(() => {
                    return (<SolicitationCardInfo >
                        <Typography component={"span"}>2345</Typography>
                        <Typography component={"span"}>
                            Status:
                            <Typography component={"span"}>
                                Pendente
                            </Typography>
                        </Typography>
                        <Typography component={"span"}>
                            Livro Solicitado:
                            <Typography component={"span"}>
                                Pequeno principe
                            </Typography>
                        </Typography>
                        <Typography component={"span"}>
                            Solicitante:
                            <Typography component={"span"}>
                                Ian vinicius
                            </Typography>
                        </Typography>
                        <Typography component={"span"}>
                            Responsável pela solicitação:
                            <Typography component={"span"}>
                                Silvio Paiva
                            </Typography>
                        </Typography>
                    </SolicitationCardInfo>)
                })
            }
            <MoreOptions handleOpen={setOpenOptions} open={openOptions} options={[{ label: "cancelar" }]} id="oo"></MoreOptions>
        </SolicitationCardContainer>
    )
}
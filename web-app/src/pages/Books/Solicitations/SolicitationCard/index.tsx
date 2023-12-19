import { CurrencyExchange } from "@mui/icons-material";
import { SolicitationCardBadge, SolicitationCardContainer, SolicitationCardInfo } from "./styles";
import { Box, Typography, useTheme } from "@mui/material";
import MoreOptions from "../../../../components/MoreOptions";
import { useContext, useEffect, useState } from "react";
import { SolicitationCardProps } from "./types";
import { SolicitationStatus } from "../../../../commons/ISolicitation";
import { DropdownOptions } from "../../../../components/Dropdown/type";
import { AuthContext } from "../../../../contexts/AuthContext";

export default function SolicitationCard({ status, book, user, id, updateStatus }: SolicitationCardProps) {
    const [openOptions, setOpenOptions] = useState(false)
    const [options, setOptions] = useState<DropdownOptions[]>([])
    const [authData] = useContext(AuthContext)

    const theme = useTheme()
    const colors = {
        pending: theme.palette.primary[700],
        accepted: theme.palette.success.main,
        canceled: "#FBE200",
        refused: theme.palette.error.main
    }


    useEffect(() => {
        if (authData?.userData?.id === user?.id && status === "pending") {
            setOptions((curr) => [...curr, {
                label: "Cancelar", handler: () => {
                    updateStatus(id as string, "canceled")
                }
            }])
        }

        if (authData?.userData?.id === book?.user?.id && status === "pending") {
            setOptions((curr) => [...curr, {
                label: "Aceitar", handler: () => {
                    updateStatus(id as string, "accepted")
                }
            }, {
                label: "Recusar", handler: () => {
                    updateStatus(id as string, "refused")
                }
            }])
        }

        return () => {
            setOptions([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <SolicitationCardContainer>
            <Box>
                <SolicitationCardBadge bgcolor={colors[status]}>
                    <CurrencyExchange color="primary" />
                </SolicitationCardBadge>
            </Box>
            <SolicitationCardInfo >
                <Typography component={"span"}>2345</Typography>
                <Typography component={"span"}>
                    Status:
                    <Typography component={"span"}>
                        {SolicitationStatus[status]}
                    </Typography>
                </Typography>
                <Typography component={"span"}>
                    Livro Solicitado:
                    <Typography component={"span"}>
                        {book?.name}
                    </Typography>
                </Typography>
                <Typography component={"span"}>
                    Solicitante:
                    <Typography component={"span"}>
                        {user?.name}
                    </Typography>
                </Typography>
                <Typography component={"span"}>
                    Responsável pela solicitação:
                    <Typography component={"span"}>
                        {book?.user.name}
                    </Typography>
                </Typography>
            </SolicitationCardInfo>
            {status === "pending" &&
                <MoreOptions handleOpen={setOpenOptions} open={openOptions} options={options} id={id as string}></MoreOptions>

            }
        </SolicitationCardContainer>
    )
}
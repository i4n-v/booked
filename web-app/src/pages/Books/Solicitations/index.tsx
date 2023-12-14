import { Box, Button, Pagination, Typography } from "@mui/material";
import Content from "../../../components/Layout/Content/styles";
import BooksActions from "../Actions";
import { SolicitationsContainer, SolicitationsTypes } from "./styles";
import SolicitationCard from "./SolicitationCard";
import { useMutation, useQuery } from "react-query";
import { useSolicitation } from "../../../services/useSolicitation";
import { useState } from "react";
import { ISolicitationStatus } from "../../../commons/ISolicitation";
import useNotifier from "../../../helpers/Notify";

export default function Solicitations() {
    const { getSolicitations, cancelSolicitation } = useSolicitation()
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})
    const notify = useNotifier()
    const cancelMutation = useMutation({
        mutationKey: "solicitation-calcel-mutation",
        mutationFn: cancelSolicitation
    })
    const { data: solicitations, refetch } = useQuery(["getSolicitations", page, filter], () => getSolicitations({ page, limit: 10, type: "received", ...filter }), {
        onSuccess() {
            // window.scrollTo(0, 0);
        },
        suspense: false
    })
    function updateStatus(id: string, status: ISolicitationStatus) {
        cancelMutation.mutate({ id, status }, {
            onSuccess: (data) => {
                refetch()
                notify(data.message)
            },
            onError(data: any) {
                notify(data.message, "error")
            }
        })
    }
    return (
        <Content>
            <Typography component={"h1"}>Solicitações</Typography>
            <BooksActions
                filter
                handleFilter={(values) => setFilter(values)}
                dateLabels={{
                    minDate: "Data mínima",
                    maxDate: "Data máxima",
                }}
                solicitations
            />
            {solicitations?.items.length ?
                <>
                    <SolicitationsContainer>
                        {solicitations?.items?.map((solicitation) => (
                            <SolicitationCard key={solicitation.id} {...solicitation} updateStatus={updateStatus} ></SolicitationCard>
                        )
                        )}
                    </SolicitationsContainer>
                    <Box display={"flex"} justifyContent={"center"}>
                        <Pagination page={page} onChange={(_, value) => setPage(value)} count={solicitations?.totalPages} showFirstButton showLastButton />
                    </Box>
                </>
                : <Typography
                    sx={{
                        width: "100%",
                        textAlign: "center",
                        padding: "15px",
                        color: (t) => t.palette.secondary[800],
                    }}
                >
                    Nenhuma solicitação encontrada.
                </Typography>}
        </Content>
    )
}
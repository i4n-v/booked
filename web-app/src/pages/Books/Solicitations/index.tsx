import { Box, Button, Typography } from "@mui/material";
import Content from "../../../components/Layout/Content/styles";
import BooksActions from "../Actions";
import { SolicitationsContainer, SolicitationsTypes } from "./styles";
import SolicitationCard from "./SolicitationCard";

export default function Solicitations() {
    return (
        <Content>
            <Typography component={"h1"}>Solicitações</Typography>
            <BooksActions
                filter
                handleFilter={() => ''}
                dateLabels={{
                    minDate: "Data mínima",
                    maxDate: "Data máxima",
                }}
                solicitations
            />
            <SolicitationsContainer>
                <SolicitationCard></SolicitationCard>
            </SolicitationsContainer>
        </Content>
    )
}
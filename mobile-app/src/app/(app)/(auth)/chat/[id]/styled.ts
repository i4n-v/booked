import { MainButton } from "@/components/Buttons";
import styled from "styled-components/native";

const Container = styled.View`
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
    row-gap: 10px;
    padding-bottom: 20px;
`
const SendSession = styled.View`
    display: flex;
    flex-direction: row;
    column-gap: 5px;
    padding: 10px 20px;
`
const MessagesSession = styled.View`
    display: flex;
    flex-direction: column-reverse;
    row-gap: 10px;
`

const Button = styled(MainButton)`
    height: 44px;
    width: 70px;
    color: ${({theme}) => theme.colors.primary?.[600]}
`
export default {Container,SendSession,MessagesSession,Button}
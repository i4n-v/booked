import styled from "styled-components/native";

const Container = styled.View<MessageProps>`
    display: flex;
    flex-direction:${({mine}) => mine ? "row-reverse" : "row"} ;
    align-items: center;
    column-gap: 5px;
    padding: 0px 20px;
`

const Content = styled.Text<MessageContentProps>`
    background-color: ${({mine,theme}) => mine ? theme.colors.primary?.[50] : "white"};
    max-width: 70%;
    border-radius: 10px;
    padding: 10px;
`
export default {Container,Content} 
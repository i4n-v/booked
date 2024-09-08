import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

const Container = styled.View<MessageProps>`
    display: flex;
    flex-direction:${({mine}) => mine ? "row-reverse" : "row"} ;
    align-items: center;
    column-gap: 5px;
    padding: 0px 20px;
`

const MessageImage = styled(TouchableOpacity)`
  width: 191px;
  height: 140px;
  border-radius: 8px 8px 0 0;
`;

const Content = styled.Text<MessageContentProps>`
    background-color: ${({mine,theme}) => mine ? theme.colors.primary?.[50] : "white"};
    max-width: 70%;
    border-radius: 10px;
    padding: 10px;
`
export default {Container,Content,MessageImage} 
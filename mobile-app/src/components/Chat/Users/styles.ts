import { Text, View } from "react-native";
import styled from "styled-components/native";
import { ContainerProps } from "./types";

const Container = styled(View)<ContainerProps>`
    display: flex;
    flex-direction: row;
    padding: 20px;
    align-items: center;
    background-color: ${({active,theme}) =>active ? theme.colors.primary?.[50]  :"white" } ;
`;

const Center = styled(View)`
    flex: 1;
    padding: 0px 10px;
    display: flex;
    gap: 5px;
`;

const End = styled(View)`
    display: flex;
    gap: 5px;
`;

const Username = styled(Text)`
     font-size: ${({ theme }) => theme.typography.size.xxs}px;
`;

const LastMessagePreview = styled(Text)`
    font-size: ${({ theme }) => theme.typography.size.xxs}px;
    color: ${({ theme }) => theme.colors.secondary?.[700]};
`;

export default { Container, Center, End, LastMessagePreview, Username };

import { MainButton } from "@/components/Buttons";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { BookListItemProps, ImagePreviewContainerProps } from "./types";

const Container = styled.View`
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
    row-gap: 10px;
    padding-bottom: 20px;
`;
const SendSession = styled.View`
    display: flex;
    flex-direction: row;
    column-gap: 5px;
    padding: 10px 20px;
`;
const MessagesSession = styled.View`
    display: flex;
    flex-direction: column-reverse;
    row-gap: 10px;
`;

const Button = styled(MainButton)`
    height: 44px;
    width: 70px;
    color: ${({ theme }) => theme.colors.primary?.[600]};
`;

const SelectedBooksSession = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 3px;
`;

const SelectedBookItem = styled(TouchableOpacity)`
    padding: 5px;
    border-radius: 5px;
    flex-basis: 49%;
    display: flex;
    align-items: center;
    background-color:${({ theme }) => theme.colors.primary?.[300]};
`;
const BookListItem = styled(TouchableOpacity)<BookListItemProps>`
    height: 42px;
    background-color: ${({ theme, active }) => (active ? theme.colors.primary?.[0] : theme.colors.secondary?.[50])};
    border-radius: 10px ;
    display: flex;
    justify-content: center;
    padding-left: 5%;
`;

const BookListItemTitle = styled.Text`
    color: white;
    font-size: 18px;
    white-space: nowrap;
`;

const BookTitle = styled.Text`
    color: ${({ theme }) => theme.colors.secondary?.[1000]};
`;

const ImagePreview = styled.ImageBackground`
    width: 100%;
    height: 100%;
`;

const ImagePreviewContainer = styled.View<ImagePreviewContainerProps>`
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
`;
export default {
  Container,
  SendSession,
  MessagesSession,
  Button,
  BookListItem,
  BookTitle,
  SelectedBooksSession,
  SelectedBookItem,
  BookListItemTitle,
  ImagePreview,
  ImagePreviewContainer,
};

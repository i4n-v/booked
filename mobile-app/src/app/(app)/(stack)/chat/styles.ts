import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { BottomSheetListItemProps, BottomSheetTitleProps } from "./types";

export const ChatList = styled.View`
    display: flex;
    row-gap: 1px;
`

export const BottomSheetTitle = styled.Text<BottomSheetTitleProps>`
    color: ${({ theme, touchable }) => (touchable ? theme.colors.primary?.[300] : theme.colors.secondary?.[1000])};
    font-size: 18px;
`;

export const BottomSheetHeader = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const BottomSheetButton = styled(TouchableOpacity)`
    height: 44px;
    width: fit-content;
`;
export const BottomSheetListItem = styled(TouchableOpacity)<BottomSheetListItemProps>`
    height: 42px;
    background-color: ${({ theme, active }) => (active ? theme.colors.primary?.[0] : theme.colors.secondary?.[50])};
    border-radius: 10px ;
    display: flex;
    justify-content: center;
    padding-left: 5%;
`;
export default {BottomSheetTitle,BottomSheetListItem ,BottomSheetHeader,BottomSheetButton,ChatList}
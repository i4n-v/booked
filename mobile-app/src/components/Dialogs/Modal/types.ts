import { StyleProp, ViewStyle } from "react-native";

interface IModalProps {
    title?: string;
    open: boolean;
    onClose: (open: boolean) => void;
    containerStyles?: StyleProp<ViewStyle>;
    children: React.ReactNode;
    hideCloseButton?: boolean;
    fullScreen?: boolean;
}

export { IModalProps }
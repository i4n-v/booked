import { StyleProp, ViewStyle } from "react-native"

interface ICardProps {
    title: string;
    subtitle?: string;
    labelTitle?: string;
    icon?: React.ReactNode;
    tags?: string[];
    containerStyle?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
    main?: boolean;
}

interface IContainerProps {
    main?: boolean;
}

export { ICardProps, IContainerProps }
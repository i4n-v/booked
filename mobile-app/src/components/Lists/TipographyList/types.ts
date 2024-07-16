import { StyleProp, ViewStyle } from "react-native";

type labelTypes = "string" | "number" | "boolean" | "date" | "date-hour";

export interface ILabels<T> {
    name: string;
    path: string;
    label: string;
    type: labelTypes;
    format?: (value: keyof T, row: T) => string | React.ReactNode;

}

export interface ITipography<T> {
    labels: ILabels<T>[]
    data: T;
    numberColumns?: 1 | 2 | 3 | 4;
    containerStyles?: StyleProp<ViewStyle>
}

export interface ITipographyContainerProps {
    numberColumns: number;
    numberItems: number;
    currentNumberItem: number
}
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface IAccordion {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    expanded?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    children: React.ReactNode;
}
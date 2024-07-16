import React from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface ICardAccordion {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    expanded?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    children: React.ReactNode;
    contentCard?: React.ReactNode
}
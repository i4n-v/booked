import styled from "styled-components/native";
import { IDividerProps } from "./types";


const Divider = styled.View<IDividerProps>`
    width: ${({ orientation }) => orientation === "vertical" ? 2 + 'px' : "100%"};
    height: ${({ orientation }) => orientation === "vertical" ? "100%" : 2 + 'px'};
    background-color: ${({ theme }) => theme.colors.text?.[200]};
    border-radius: ${({ theme }) => theme.shape.borderRadius}px;
    margin: 5px;
`;


export { Divider }
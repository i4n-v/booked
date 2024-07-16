import styled from "styled-components/native";
import { ITipographyContainerProps } from "./types";


const Container = styled.View`
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 5px;
`;

const TipographyContainer = styled.View<ITipographyContainerProps>`
    width: ${({ numberColumns, numberItems, currentNumberItem }) => {
        const endColumns = numberItems % numberColumns;
        const isLastRow = currentNumberItem >= numberItems - endColumns;

        if (!isLastRow) {
            return 100 / numberColumns + "%";
        }
        return 100 / endColumns + "%";
    }
    };
`;

const Title = styled.Text`
    font-family: ${({ theme }) => theme.typography.fonts.primary.semibold};
    font-size: ${({ theme }) => theme.typography.size.regular + "px"};
    color: ${({ theme }) => theme.colors.primary?.[200]};
`;

const Subtitle = styled.Text`
    font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
    font-size: ${({ theme }) => theme.typography.size.body + "px"};
    color: ${({ theme }) => theme.colors.text?.[500]};
`;


export { Title, Subtitle, Container, TipographyContainer }
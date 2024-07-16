import styled from "styled-components/native";

const TitleContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    background-color: ${({ theme }) => theme.colors.primary?.[200]};
`;

const TableHeader = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    /* padding: 12px; */
`;

const LineContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const LabelContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 12px;
`;

const EmptyContainer = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 12px;
`;


const LabelHeader = styled.Text`
    font-family: ${({ theme }) => theme.typography.fonts.primary.semibold};
    font-size: ${({ theme }) => theme.typography.size.body + "px"};
    color: ${({ theme }) => theme.colors.primary?.[400]};
`;

const LabelLine = styled.Text`
    font-family: ${({ theme }) => theme.typography.fonts.primary.normal};
    font-size: ${({ theme }) => theme.typography.size.body + "px"};
    color: ${({ theme }) => theme.colors.text?.[500]};
`;



const Title = styled.Text`
    font-family: ${({ theme }) => theme.typography.fonts.primary.semibold};
    font-size: ${({ theme }) => theme.typography.size.regular + "px"};
    color: ${({ theme }) => theme.colors.text?.[200]};
`;


export { TitleContainer, Title, TableHeader, LabelHeader, LineContainer, LabelLine, LabelContainer, EmptyContainer }
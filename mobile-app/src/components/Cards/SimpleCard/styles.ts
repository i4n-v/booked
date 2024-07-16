import { styled } from 'styled-components/native'
import { IContainerProps } from './types';

const Container = styled.View<IContainerProps>`
    align-items: center;
    width: 100%;
    padding: 12px;
    background-color: ${({ theme }) => theme.colors.secondary?.[0]};
    elevation: ${({ theme }) => theme.shadows[9].mobile.elevation};
    box-shadow: ${({ theme }) => theme.shadows[9].web};
    border-left-width: ${({ main }) => main ? 6 : 0 + "px"};
    border-color: ${({ theme }) => theme.colors.primary?.[200]};
    border-radius: ${({ theme }) => theme.shape.borderRadius + "px"};
`;

const HeadContainer = styled.View`
    flex-direction: row;
    align-items: center;
    column-gap: 12px;
    justify-content: space-between;
    width: 100%;
`;

const LabelTitle = styled.Text`
    font-family: ${({ theme }) => theme.typography.fonts.primary.semibold};
    font-size: ${({ theme }) => theme.typography.size.body + "px"};
    color: ${({ theme }) => theme.colors.primary?.[200]};
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

const TagsContainer = styled.View`
    flex-direction: row;
    gap: 10px;
    width: 100%;
`;

const TagText = styled.Text`
    font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
    font-size: ${({ theme }) => theme.typography.size.caption + "px"};
    color: ${({ theme }) => theme.colors.error?.[400]};
    border-radius: ${({ theme }) => theme.shape.borderRadius + "px"};
    background-color: ${({ theme }) => theme.colors.error?.[50]};
    padding: 4px 8px;
    margin-top: 5px;
`;



export { Container, HeadContainer, LabelTitle, Title, Subtitle, TagsContainer, TagText }
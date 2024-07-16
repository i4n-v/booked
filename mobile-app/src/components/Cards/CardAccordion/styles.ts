import styled from "styled-components/native";


const Container = styled.View`
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.secondary?.[0]};
  border-radius: 15px; 
`;

const CardContainer = styled.View`
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  align-items: center;
`;

const ContainerTextIcon = styled.View`
    flex-direction: row;
    align-items: center;
    column-gap: 12px;
    justify-content: space-between;
    width: 100%;
`;

const ContentCard = styled.View`
    width: 100%;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.semibold};
  font-size: ${({ theme }) => theme.typography.size.regular + "px"};
  color: ${({ theme }) => theme.colors.primary?.[200]};`;

const Subtitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  font-size: ${({ theme }) => theme.typography.size.caption + "px"};
  color: ${({ theme }) => theme.colors.text?.[500]};
`;


export { Container, CardContainer, Title, Subtitle, ContainerTextIcon, ContentCard }
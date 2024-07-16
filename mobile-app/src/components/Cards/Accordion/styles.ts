import styled from "styled-components/native";


const Container = styled.View`
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.primary?.[200]};
  border-radius: 15px;  
`;

const CardContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 12px;
`;

const ContainerTextIcon = styled.View`
    flex-direction: row;
    align-items: center;
    column-gap: 12px;
    width: 80%;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.semibold};
  font-size: ${({ theme }) => theme.typography.size.regular + "px"};
  color: ${({ theme }) => theme.colors.text?.[200]};`;

const Subtitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.light};
  font-size: ${({ theme }) => theme.typography.size.caption + "px"};
  color: ${({ theme }) => theme.colors.text?.[200]};
`;




export { Container, CardContainer, Title, Subtitle, ContainerTextIcon }
import styled from "styled-components/native";

const ExternalContainer = styled.View`
    position: absolute;
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    justify-content: center;
    flex: 1;
`;

const ModalContainer = styled.View`
    background-color: ${({ theme }) => theme.colors.secondary?.[0]};
    border-radius: ${({ theme }) => theme.shape.borderRadius + "px"};   
    margin-left: 20px;
    margin-right: 20px;
    padding: 12px;
`;

const ContainerChildren = styled.View`
    flex: 1;
`;

const OnCloseButton = styled.TouchableOpacity`
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 10;
`;

const Title = styled.Text`
    font-family: ${({ theme }) => theme.typography.fonts.primary.semibold};
    font-size: ${({ theme }) => theme.typography.size.regular + "px"};
    color: ${({ theme }) => theme.colors.primary?.[200]};
    width: 90%;
`;

export { ExternalContainer, ModalContainer, OnCloseButton, Title, ContainerChildren }
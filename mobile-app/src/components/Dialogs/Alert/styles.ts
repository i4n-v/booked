import { IconButton } from "@/components/Buttons";
import { StyleSheet, Dimensions } from "react-native";
import styled from "styled-components/native";

const Overlay = styled.View`
  background-color: rgba(0, 0, 0, 0.3);
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const AlertContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary?.[0]};
  width: ${Dimensions.get("window").width * 0.9 + "px"};
  padding: ${({ theme }) => theme.shape.padding + "px"};
  border-radius: 8px;
  gap: 12px;
  box-shadow: ${({ theme }) => theme.shadows[0].web};
`;

const MessageContainer = styled.View`  
  align-items: center;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  padding: 0;
  align-self: flex-end;
  top: 0;
  right: 10px;
`;

const MajorCircle = styled.View`
  background-color: rgba(252, 165, 165, 0.1);
  padding: 8px;
  border-radius: 32px;
`;

const MinorCircle = styled.View`
  background-color: rgba(252, 165, 165, 0.2);
  align-items: center;
  justify-content: center;
  border-radius: 21px;
  width: 42px;
  height: 42px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.secondary?.[900]};
  font-family: ${({ theme }) => theme.typography.fonts.primary.normal};
  font-size: ${({ theme }) => theme.typography.size.regular + "px"};
  margin-bottom: 8px;
`;

const Message = styled.Text`
  color: ${({ theme }) => theme.colors.secondary?.[500]};
  font-family: ${({ theme }) => theme.typography.fonts.primary.normal};
  font-size: ${({ theme }) => theme.typography.size.body + "px"};
  margin-bottom: 12px;
`;

const Emphasis = styled.Text`
  color: ${({ theme }) => theme.colors.secondary?.[700]};
  font-family: ${({ theme }) => theme.typography.fonts.primary.semibold};
`;

const ActionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export {
  Overlay,
  AlertContainer,
  MessageContainer,
  CloseButton,
  MajorCircle,
  MinorCircle,
  Title,
  Message,
  ActionsContainer,
  Emphasis,
};

const styles = () => {
  return StyleSheet.create({
    button: {
      width: "40%",
      height: 42,
    },
  });
};

export default styles;

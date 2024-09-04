import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  margin-top: 20px;
  padding: 12px;
  background-color: #f5f5f5;
`;

const Text = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  color: ${({ theme }) => theme.colors.text?.[1000]};
`;

const IdentityInfo = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  font-sixe: 14px;
`;

const Name = styled(Text)`
  color: #000;
`;

const Dot = styled.Text`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #9b51e0;
  margin-horizontal: 8px;
  text-align: center;
  line-height: 8px;
`;

const Username = styled(Text)`
  color: #595959;
`;

const FollowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  margin-right: 5px;
  border-color: #9b51e0;
  border-width: 1px;
`;

const ButtonFollowing = styled(Button)`
  background-color: #4caf50;
`;

const ButtonNotFollowing = styled(Button)`
  background-color: #2196f3;
`;

const ButtonText = styled.Text`
  color: #9b51e0;
  margin-left: 2px;
  font-size: 14px;
  font-size: 12px;
`;

const FollowButton = styled(Button)`
  width: 90px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 5px;
  flex: 1;
  backgroundColor: '#fff',
`;

const StatBox = styled.View`
  align-items: center;
  flex: 1;
`;

const StatValue = styled(Text)`
  color: #9b51e0;
  font-size: 12px;
  font-weight: 600;
`;

const StatLabel = styled(Text)`
  color: #595959;
  font-size: 12px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.secondary?.[300]};
  margin: 16px -16px;
`;

const DividerVertical = styled.View`
  height: 35px;
  background-color: #dedede;
  width: 1px;
  margin-vertical: 16px;
`;

export {
  Container,
  Text,
  IdentityInfo,
  Name,
  Dot,
  Username,
  FollowContainer,
  Button,
  ButtonFollowing,
  ButtonNotFollowing,
  ButtonText,
  FollowButton,
  StatsContainer,
  StatBox,
  StatValue,
  StatLabel,
  Divider,
  DividerVertical,
};

import styled from "styled-components/native";

const ProfileContainer = styled.View`
  padding: 20px 16px;
  margin-top: 2px;
  background-color: ${({ theme }) => theme.colors.secondary?.[0]};
  margin: 2px -16px 0px -16px;
  ${({ theme }) => theme.shadows[0] as any}
`;

const UserContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PhotoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const UserPhoto = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 60px;
`;

const Insights = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const Insight = styled.View`
  align-items: center;
  gap: 1px;
`;

const InsightData = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  font-size: ${({ theme }) => theme.typography.size.xxs + "px"};
  color: ${({ theme }) => theme.colors.primary?.[200]};
`;

const InsightTitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.normal};
  font-size: ${({ theme }) => theme.typography.size.xxs + "px"};
  color: ${({ theme }) => theme.colors.secondary?.[1000]};
`;

const Divider = styled.View`
  width: 2px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.secondary?.[300]};
`;

const FilterTitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  font-size: ${({ theme }) => theme.typography.size.xs + "px"};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text?.[1000]};
  margin-bottom: 8px;
`;

export {
  ProfileContainer,
  UserContainer,
  PhotoContainer,
  UserPhoto,
  Insights,
  Insight,
  InsightData,
  InsightTitle,
  Divider,
  FilterTitle,
};

import styled from "styled-components/native";
import SkeletonBones from "../../SkeletonBones";

const SkeletonContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  gap: 8px;
  padding: 16px 10px;
  border-radius: 10px;
  height: 160px;
  z-index: 999px;
  width: 100%;
  align-self: center;
  background-color: ${({ theme }) => theme.colors.secondary?.[0]};
  box-shadow: ${({ theme }) => theme.shadows[1].web};
`;

const InfoWrapper = styled.View`
  gap: 14px;
`;

const DescriptionWrapper = styled.View`
  gap: 8px;
`;

const TitleBone = styled(SkeletonBones)`
  height: 34px;
  background-color: ${({ theme }) => theme.colors.secondary?.[200]};
`;

const DescriptionBone = styled(SkeletonBones)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary?.[200]};
`;

const ProfileBone = styled(SkeletonBones)`
  height: 76px;
  background-color: ${({ theme }) => theme.colors.secondary?.[200]};
  position: absolute;
  right: 0;
  border-radius: 0 12px 20px 140px;
`;

export {
  SkeletonContainer,
  InfoWrapper,
  DescriptionWrapper,
  TitleBone,
  DescriptionBone,
  ProfileBone,
};

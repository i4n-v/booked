import styled, { css } from "styled-components/native";
import SkeletonBones from "../../SkeletonBones";

const SkeletonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.secondary?.[0]};
  ${({ theme }) => theme.shadows[0] as any}
`;

const UserContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const ImageBone = styled(SkeletonBones)`
  width: 42px;
  height: 42px;
  border-radius: 42px;
  background-color: ${({ theme }) => theme.colors.secondary?.[200]};
`;

const IconBone = styled(SkeletonBones)`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-color: ${({ theme }) => theme.colors.secondary?.[200]};
`;

const InfoContainer = styled.View`
  gap: 2px;
`;

const AuthorName = styled(SkeletonBones)`
  width: 144px;
  background-color: ${({ theme }) => theme.colors.secondary?.[200]};
`;

const UserName = styled(SkeletonBones)`
  width: 58px;
  background-color: ${({ theme }) => theme.colors.secondary?.[200]};
`;

export {
  SkeletonContainer,
  UserContainer,
  ImageBone,
  IconBone,
  AuthorName,
  UserName,
  InfoContainer,
};

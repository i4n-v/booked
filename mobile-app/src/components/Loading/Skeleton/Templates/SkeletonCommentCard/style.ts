import styled, { css } from "styled-components/native";
import SkeletonBones from "../../SkeletonBones";

const SkeletonContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 6px;
`;

const ImageBone = styled(SkeletonBones)`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-color: ${({ theme }) => theme.colors.secondary?.[200]};
`;

const CommentContainer = styled.View`
  gap: 2px;
`;

const UserName = styled(SkeletonBones)`
  width: 120px;
  background-color: ${({ theme }) => theme.colors.secondary?.[200]};
`;

const Comment = styled(SkeletonBones)`
  width: 260px;
  background-color: ${({ theme }) => theme.colors.secondary?.[200]};
`;

export { SkeletonContainer, ImageBone, CommentContainer, UserName, Comment };

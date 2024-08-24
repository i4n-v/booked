import styled, { css } from "styled-components/native";
import SkeletonBones from "../../SkeletonBones";

const SkeletonContainer = styled.View`
  width: 100%;
  max-width: 191px;
  height: 285px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.secondary?.[0]};
  ${({ theme }) => theme.shadows[0] as any}
`;

const ImageBone = styled(SkeletonBones)`
  width: 100%;
  height: 140px;
  border-radius: 8px 8px 0 0;
  background-color: ${({ theme }) => theme.colors.secondary?.[200]};
`;

const InfoContainer = styled.View`
  padding: 8px;
`;

const descriptionStyles = css`
  height: 18px;
  background-color: ${({ theme }) => theme.colors.secondary?.[200]};
  `;

const TitleBone = styled(SkeletonBones)`
  ${descriptionStyles}
  width: 126px;
  margin-bottom: 6px;
  `;

const AuthorBone = styled(SkeletonBones)`
  ${descriptionStyles}
  width: 170px;
  margin-bottom: 12px;
  `;

const RatingBone = styled(SkeletonBones)`
  width: 170px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.secondary?.[200]};
  margin-bottom: 12px;
`;

const PriceBone = styled(SkeletonBones)`
  width: 80px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.secondary?.[200]};
`;

export {
  TitleBone,
  SkeletonContainer,
  ImageBone,
  InfoContainer,
  AuthorBone,
  RatingBone,
  PriceBone,
};

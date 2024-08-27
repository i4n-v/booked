import styled, { css } from "styled-components/native";
import SkeletonBones from "../../SkeletonBones";

const SkeletonContainer = styled.View`
  width: 100%;
  border-radius: 8px;
  display: flex;
  padding: 10px 30px;
  row-gap: 10px;
`;

const MessageContentStyle = styled.View<MessageContentProps>`
    display: flex;
    flex-direction: ${({ mine }) => (mine ? "row-reverse" : "row")};
`;
const MessageBone = styled(SkeletonBones)`
  height: 30px;
  background-color: ${({ theme }) => theme.colors.secondary?.[200]};
`;

export { SkeletonContainer, MessageContentStyle,MessageBone };

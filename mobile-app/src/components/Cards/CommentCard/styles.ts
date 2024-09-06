import styled from "styled-components/native";

const CardWrapper = styled.View`
  gap: 6px;
`;

const CardContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 6px;
  background-color: ${({ theme }) => theme.colors.secondary?.[0]};
`;

const ResponsesContainer = styled.View`
  gap: 10px;
  margin-top: 8px;
  padding-left: 38px;
`;

const UserPhoto = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 32px;
`;

const CommentContainer = styled.View`
  gap: 2px;
`;

const UserName = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.normal};
  font-size: ${({ theme }) => theme.typography.size.xs + "px"};
  color: ${({ theme }) => theme.colors.secondary?.[1000]};
`;

const Comment = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.normal};
  max-width: 99%;
  font-size: ${({ theme }) => theme.typography.size.xxs + "px"};
  color: ${({ theme }) => theme.colors.secondary?.[700]};
`;

const MoreResponsesContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Divider = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.secondary?.[100]};
`;

const MoreResponses = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.normal};
  font-size: ${({ theme }) => theme.typography.size.xxs + "px"};
  color: ${({ theme }) => theme.colors.primary?.[200]};
`;

export {
  CardWrapper,
  CardContainer,
  ResponsesContainer,
  UserPhoto,
  CommentContainer,
  UserName,
  Comment,
  MoreResponsesContainer,
  Divider,
  MoreResponses,
};

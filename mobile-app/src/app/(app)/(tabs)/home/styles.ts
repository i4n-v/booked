import styled from "styled-components/native";

const Title = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  font-size: ${({ theme }) => theme.typography.size.md + "px"};
  color: ${({ theme }) => theme.colors.text?.[1000]};
  margin: 16px 24px 16px 12px;
`;

const Detail = styled.Text`
  color: ${({ theme }) => theme.colors.primary?.[200]};
`;

const SkeletonContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 16px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.secondary?.[300]};
  margin: 16px -16px;
`;

export { Title, Detail, Divider, SkeletonContainer };

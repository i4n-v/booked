import { FlatList } from "@/components/Lists";
import styled from "styled-components/native";

const OptionTagContainer = styled.View`
  flex-wrap: wrap;
  width: 100%;
  padding: 2px 0;
  flex-direction: row;
  gap: 8px;
  margin-top: 4px;
`;

const OptionTag = styled.View`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.secondary?.[200]};
  background-color: ${({ theme }) => theme.colors.secondary?.[50]};
  border-radius: 4px;
  padding: 8px;
  align-items: center;
  flex-direction: row;
  gap: 4px;
`;

const OptionTagLabel = styled.Text`
  font-size: ${({ theme }) => theme.typography.size.xxs + "px"};
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  color: ${({ theme }) => theme.colors.text?.[700]};
`;

const InputList = styled(FlatList)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary?.[100]};
  border-radius: 0 0 6px 6px;
  max-height: 200px;
` as typeof FlatList;

export { OptionTag, OptionTagLabel, OptionTagContainer, InputList };

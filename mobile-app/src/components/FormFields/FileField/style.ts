

import { Button } from "@/app/(app)/sigin/styles";
import styled from "styled-components/native";

const Container = styled.View`
  
`;

const FileButton = styled(Button)<{ hasValue: boolean }>`
    height: 44px;
    width: 70px;
    color: ${({ theme }) => theme.colors.primary?.[600]};
    margin: 0;
`;

const SelectedFileName = styled.Text`
  flex: 1;
  margin-left: 10px;
  color: #333;
`;

export { SelectedFileName, FileButton, Container };

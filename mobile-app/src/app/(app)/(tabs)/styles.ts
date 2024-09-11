import { Image } from "react-native";
import styled from "styled-components/native";

const ProfileIcon = styled(Image)`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  border-color: ${({ theme }) => theme.colors.secondary?.[100]};
  ${({ theme }) => theme.shadows[0] as any}
`;

export { ProfileIcon };

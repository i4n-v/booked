import { StyleSheet } from "react-native";
import styled, { useTheme } from "styled-components/native";

const Backdrop = styled.Pressable`
  background-color: "rgba(0, 0, 0, 0.4)";
`;

export { Backdrop };

const styles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.secondary?.[0],
      borderRadius: 12,
      ...theme.shadows[5].mobile,
    },
    contentContainer: {
      backgroundColor: theme.colors.secondary?.[0],
    },
    indicator: {
      backgroundColor: theme.colors.primary?.[200],
    },
  });
};

export default styles;

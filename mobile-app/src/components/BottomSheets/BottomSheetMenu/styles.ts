import { StyleSheet, Dimensions } from "react-native";
import { useTheme } from "styled-components";

const styles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    itemSeparator: {
      height: 1,
      backgroundColor: theme.colors.secondary[200],
      width: Dimensions.get("screen").width - 22,
      alignSelf: "center",
    },
    listItemContainer: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: 12,
      padding: theme.shape.padding,
    },
    iconButton: {
      color: theme.colors.primary[200],
      size: 24,
    },
    itemText: {
      fontSize: theme.typography.size.body,
      fontFamily: theme.typography.fonts.primary.medium,
      color: theme.colors.text[700],
    },
    disabled: {
      opacity: theme.shape.opacity,
    },
  });
};

export default styles;

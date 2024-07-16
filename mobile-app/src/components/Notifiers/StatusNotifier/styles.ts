import { StyleSheet, Dimensions } from "react-native";
import { useTheme } from "styled-components";

const styles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      alignSelf: "center",
      width: "80%",
      height: 50,
      position: "absolute",
    },
    alert: {
      alignSelf: "center",
      position: "absolute",
      padding: theme.shape.padding,
      borderRadius: 4,
      marginBottom: 16,
      ...theme.shadows[1].mobile,
    },
    innerContainer: {
      width: Dimensions.get("window").width - 112.5,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    messageContainer: {
      flex: 1,
      flexDirection: "row",
      gap: 10,
    },
    messageText: {
      fontSize: 16,
      flex: 1,
      maxWidth: Dimensions.get("window").width - 112.5,
    },
    closeButton: {
      padding: 2,
      alignSelf: "flex-start",
    },
  });
};
export default styles;

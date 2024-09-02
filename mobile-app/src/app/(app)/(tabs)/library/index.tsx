import { Text, View } from "react-native";
import { Button } from "../../styles";
import { router } from "expo-router";

function FirstExample() {

  function goTo(){
    router.navigate('/(app)/(auth)/chat')
  }
  return (
    <View>
      <Text>Library screen</Text>
      <Button onPress={goTo}>GO</Button>
    </View>
  );
}

export default FirstExample;

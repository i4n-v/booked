import { Tabs } from "expo-router/tabs";
import { MaterialIcons } from "@expo/vector-icons";

export default function AppLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: (props) => <MaterialIcons name="home" {...props} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: (props) => <MaterialIcons name="person" {...props} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: (props) => <MaterialIcons name="settings" {...props} />,
        }}
      />
    </Tabs>
  );
}

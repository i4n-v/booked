import { Tabs } from "expo-router/tabs";
import { TabBar } from "@/components";
import { Account, Chat, Home, Library, Transfer } from "@/components/Icons";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Image } from "react-native";
import { ProfileIcon } from "./styles";

const userPath = require("../../../../../assets/images/user.jpg");

export default function AppLayout() {
  const { user } = useContext(AuthContext)!;

  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: () => <Home />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Biblioteca",
          tabBarIcon: () => <Library />,
        }}
      />
      <Tabs.Screen
        name="solicitations"
        options={{
          title: "Solicitações",
          tabBarIcon: () => <Transfer />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Menssagens",
          tabBarIcon: () => <Chat />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: () => {
            if (user?.photo_url) {
              return <ProfileIcon source={{ uri: user?.photo_url }} />;
            }

            return <Account />;
          },
        }}
      />
    </Tabs>
  );
}

import { Tabs } from "expo-router/tabs";
import { TabBar } from "@/components";
import { Account, Chat, Home, Library, Transfer } from "@/components/Icons";

export default function AppLayout() {
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
          tabBarIcon: () => <Account />,
        }}
      />
    </Tabs>
  );
}

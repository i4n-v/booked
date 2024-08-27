import { Tabs } from "expo-router/tabs";
import { TabBar } from "@/components/Navigation";
import { Account, Chat, Home, Library, Transfer } from "@/components/Icons";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { ProfileIcon } from "./styles";
import { SearchHeader } from "@/components/Navigation/Headers";
import { router } from "expo-router";

export default function AppLayout() {
  const { user } = useContext(AuthContext)!;

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        header: (props) => <SearchHeader {...props} />,
      }}
    >
      <Tabs.Screen
        name="home/index"
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
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault()
            router.push("/chat") /// your screen without Tab bar
          },
        })}
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

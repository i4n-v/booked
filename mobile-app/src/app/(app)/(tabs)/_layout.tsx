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
    <>
      <SearchHeader />
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
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
          name="library/index"
          options={{
            title: "Biblioteca",
            tabBarIcon: () => <Library />,
          }}
        />
        <Tabs.Screen
          name="solicitations/index"
          options={{
            title: "Solicitações",
            tabBarIcon: () => <Transfer />,
          }}
        />
        <Tabs.Screen
          name="chat/index"
          options={{
            title: "Menssagens/index",
            tabBarIcon: () => <Chat />,
          }}
        />
        <Tabs.Screen
          name="profile/index"
          options={{
            title: "Perfil",
            tabBarIcon: () => {
              if (user?.photo_url) {
                return <ProfileIcon source={{ uri: user?.photo_url }} />;
              }

              return <Account />;
            },
          }}
          listeners={() => ({
            tabPress: (e) => {
              e.preventDefault();
              router.navigate({
                pathname: "/profile/[userId]",
                params: {
                  userId: user?.id!,
                },
              });
            },
          })}
        />
      </Tabs>
    </>
  );
}

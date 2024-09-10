import { Tabs } from "expo-router/tabs";
import { TabBar } from "@/components/Navigation";
import { Account, Chat, Home, Library, Transfer } from "@/components/Icons";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { ProfileIcon } from "./styles";
import { SearchHeader } from "@/components/Navigation/Headers";
import { router, usePathname } from "expo-router";

export default function AppLayout() {
  const { user } = useContext(AuthContext)!;
  const route = usePathname();

  function matchProfile() {
    const regex =
      /^\/profile\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return regex.test(route);
  }

  return (
    <>
      {!matchProfile() && <SearchHeader />}
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
        backBehavior="history"
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
            title: "Mensagens",
            tabBarIcon: () => <Chat />,
          }}
          listeners={() => ({
            tabPress: (e) => {
              e.preventDefault();
              router.navigate("/(app)/(stack)/chat");
            },
          })}
        />
        <Tabs.Screen
          name="profile/[userId]"
          options={{
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
                params: { userId: user!.id },
              });
            },
          })}
        />
      </Tabs>
    </>
  );
}

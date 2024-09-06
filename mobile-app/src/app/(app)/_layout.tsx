import { Stack } from "expo-router";

export default function AppLayout() {
  return <Stack initialRouteName="signin" screenOptions={{ headerShown: false }} />;
}

import { Stack } from "expo-router";
import { StackHeader } from "@/components/Navigation/Headers";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        header: StackHeader,
      }}
    />
  );
}

import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { QueryClientProvider } from "react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { ErrorBoundary } from "@/components";
import { GlobalContextProvider } from "@/contexts/GlobalContext";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import { queryClient } from "@/config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Platform, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { FullPageLoading } from "@/components/Loading";
import { StatusNotifier } from "@/components/Notifiers";
import theme from "@/global/theme";

export default function Setup() {
  const [fontLoaded] = useFonts({
    "Montserrat-Light": require("../../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("../../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Semibold": require("../../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  if (!fontLoaded) return null;

  return (
    <ThemeContextProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <GlobalContextProvider>
            <AuthProvider>
              <GestureHandlerRootView
                style={{
                  flex: 1,
                }}
              >
                <BottomSheetModalProvider>
                  {Platform.OS === "android" ? (
                    <>
                      <StatusBar
                        style="light"
                        backgroundColor={theme["light"].colors.primary?.[200]}
                      />
                      <Slot />
                    </>
                  ) : (
                    <>
                      <StatusBar style="light" />
                      <SafeAreaView style={{ flex: 1 }}>
                        <Slot />
                      </SafeAreaView>
                    </>
                  )}
                </BottomSheetModalProvider>
                <StatusNotifier />
                <FullPageLoading />
              </GestureHandlerRootView>
            </AuthProvider>
          </GlobalContextProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </ThemeContextProvider>
  );
}

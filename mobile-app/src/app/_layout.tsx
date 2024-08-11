import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { QueryClientProvider } from "react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { ErrorBoundary } from "@/components";
import { GlobalContextProvider } from "@/contexts/GlobalContext";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import { queryClient } from "@/config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Platform, SafeAreaView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { FullPageLoading } from "@/components/Loading";
import { StatusNotifier } from "@/components/Notifiers";
import theme from "@/global/theme";

export default function RootLayout() {
  const [fontLoaded] = useFonts({
    "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("../../assets/fonts/Montserrat-Medium.ttf"),
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
                    <View
                      style={{
                        flex: 1,
                        paddingTop: 50,
                      }}
                    >
                      <StatusBar
                        style="light"
                        backgroundColor={theme.light.colors.primary?.[200]}
                      />
                      <Slot />
                    </View>
                  ) : (
                    <>
                      <StatusBar style="light" />
                      <SafeAreaView
                        style={{
                          flex: 1,
                        }}
                      >
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

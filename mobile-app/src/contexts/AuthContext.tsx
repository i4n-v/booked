import { ReactNode, createContext, useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { GlobalContext } from "@/contexts/GlobalContext";
import { useAuth } from "@/services";
import IUser from "@/types/User";
import { useAsyncStorage, useNotifier } from "@/hooks/";
import { router } from "expo-router";

interface IAuthContextProps {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  handleLogout(): void;
}

interface IAuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextProps | null>(null);

function AuthProvider({ children }: IAuthContextProviderProps) {
  const { openNotification } = useNotifier();
  const [user, setUser] = useAsyncStorage<IUser | null>("user", null);
  const [token, setToken] = useAsyncStorage<string | null>("token", null);
  const { loading } = useContext(GlobalContext)!;

  const { verify, logout } = useAuth();
  const logoutMutation = useMutation(logout);

  async function handleLogout() {
    logoutMutation.mutate(undefined, {
      onSettled(response, error: any) {
        if (response || error.message === "Conexão não autorizada.") {
          setToken(null);
          setUser(null);
          router.navigate("/sigin");
        } else {
          router.navigate("/home");
          openNotification({
            status: "error",
            message: "Não foi possivel se comunicar com o servidor.",
          });
        }
      },
    });
  }

  useQuery("validate-token", () => verify(), {
    onSuccess(response) {
      if (!response.valid) {
        return handleLogout();
      }

      router.navigate("/home");
    },
    onError() {
      handleLogout();
    },
    onSettled() {
      loading({
        isLoading: false,
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

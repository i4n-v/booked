import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, createContext, useCallback, useContext, useState } from "react";
import { useQuery } from "react-query";
// import { useAuth } from "@/services";
import { GlobalContext } from "@/contexts/GlobalContext";

interface IAuthContextProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  loged: boolean;
  setLoged: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout(): void;
}

interface IAuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextProps | null>(null);

function AuthProvider({ children }: IAuthContextProviderProps) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const [loged, setLoged] = useState(false);
  // const { validateToken } = useAuth();
  const { loading } = useContext(GlobalContext)!;

  const handleLogout = useCallback(async () => {
    await AsyncStorage.clear();
    setLoged(false);
    setUser(null);
    setToken(null);
  }, []);

  useQuery(
    "validate-token",
    () => {
      loading({ isLoading: true });
      // return validateToken();
    },
    {
      enabled: false,
      onSuccess: async (response: any) => {
        if (!response.valid) {
          setLoged(false);
        }
      },
      onError: () => {
        setLoged(false);
        loading({ isLoading: false });
      },
      onSettled: async (response) => {
        const user = await AsyncStorage.getItem("@user");
        const token = await AsyncStorage.getItem("@token");

        if (user && token && response?.valid) {
          setUser(JSON.parse(user));
          setToken(JSON.parse(token));
          setLoged(true);
        }

        loading({
          isLoading: false,
        });
      },
    },
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        loged,
        setLoged,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { GlobalContext } from "@/contexts/GlobalContext";
import { useAuth } from "@/services";
import IUser from "@/types/User";
import useAsyncStorage from "@/hooks/useAsyncStorage";
import { router } from "expo-router";
import { io, Socket } from "socket.io-client";
import { API_URL } from "../../env";

interface IAuthContextProps {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  socket: Socket | null;
  handleLogout(): void;
  connectSocket(token: string): void;
}

interface IAuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextProps | null>(null);

function AuthProvider({ children }: IAuthContextProviderProps) {
  const [user, setUser] = useAsyncStorage<IUser | null>("user", null);
  const [token, setToken] = useAsyncStorage<string | null>("token", null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { loading } = useContext(GlobalContext)!;

  const { verify, logout } = useAuth();
  const logoutMutation = useMutation(logout);

  async function handleLogout() {
    logoutMutation.mutate(undefined, {
      onSettled() {
        setToken(null);
        setUser(null);
        router.navigate("/(app)/sigin");
      },
    });
  }

  useQuery("validate-token", () => verify(), {
    onSuccess(response) {
      if (!response.valid) {
        return handleLogout();
      }
      if(!socket?.connected){
        connectSocket(token!)
      }
      router.navigate("/(app)/home");
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

  async function connectSocket(token: string) {
    try {
      if (token) {
        console.log(token)
        const socketInstance = io(API_URL as string, {
          extraHeaders: {
            "x-access-token": token as string,
          },
        }).connect();
        console.log(socketInstance)
        setSocket(socketInstance);
      } else {
        console.log("No token found");
      }
    } catch (error) {
      console.error("Error initializing socket:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        handleLogout,
        socket,
        connectSocket,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

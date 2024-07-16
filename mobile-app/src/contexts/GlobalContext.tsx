import { ReactNode, createContext, useCallback, useState } from "react";

interface ILoadingConfig {
  isLoading?: boolean;
  message?: string | null;
  opacity?: number;
}

interface INotifierStates {
  status: "error" | "info" | "success" | "warning";
  message: string;
  noTimeout: boolean;
  duration: number;
  callback(): void;
}

interface IGlobalContextProps {
  loadingConfig: ILoadingConfig;
  loading(options: ILoadingConfig): void;
  notifierStates: INotifierStates | null;
  setNotifierStates: React.Dispatch<React.SetStateAction<INotifierStates | null>>;
}

interface IGlobalContextProviderProps {
  children: ReactNode;
}

const initialLoadingConfig: ILoadingConfig = {
  isLoading: false,
  message: null,
  opacity: 1,
};

const GlobalContext = createContext<IGlobalContextProps | null>(null);

function GlobalContextProvider({ children }: IGlobalContextProviderProps) {
  const [loadingConfig, setLoadingConfig] = useState<ILoadingConfig>(initialLoadingConfig);
  const [notifierStates, setNotifierStates] = useState<INotifierStates | null>(null);

  const loading = useCallback(
    (options: ILoadingConfig) => {
      setLoadingConfig((loadingConfig) => {
        if (!options.isLoading) return initialLoadingConfig;

        return { ...loadingConfig, ...options };
      });
    },
    [initialLoadingConfig],
  );

  return (
    <GlobalContext.Provider value={{ loadingConfig, loading, setNotifierStates, notifierStates }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalContextProvider, ILoadingConfig, INotifierStates };

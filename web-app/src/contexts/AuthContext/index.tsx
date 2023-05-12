import React, { Dispatch, useReducer } from "react";
import { AuthActions, AuthActionsKind, AuthData } from "./types";
import useAuth from "../../services/useAuth";
import { useMutation } from "react-query";
import Cookies from "js-cookie";


const initialState: AuthData = {
};
export const AuthContext = React.createContext<[Partial<AuthData> | undefined, Dispatch<AuthActions>]>([initialState, (value: AuthActions) => null]);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authData, setAuthData] = React.useState<AuthData | undefined>(JSON.parse(localStorage.getItem('authData') as string))
    const { verify } = useAuth()
    const veifyMutation = useMutation(verify)
    const reducer = (state = authData, action: AuthActions) => {
        switch (action.type) {
            case AuthActionsKind.VERIFY:
                if (!!Cookies.get('x-access-token')) {
                    veifyMutation.mutate(undefined, {
                        onError: () => {
                            localStorage.removeItem('authData')
                            setAuthData(undefined)
                            Cookies.remove('x-access-token')
                        }
                    })
                }
                break
            case AuthActionsKind.SET_USER_DATA:
                localStorage.setItem('authData', JSON.stringify({
                    ...authData,
                    userData: action.payload?.userData
                }))
                setAuthData(JSON.parse(localStorage.getItem('authData') as string))
                return authData
        }
    };
    const [, dispatch] = useReducer(reducer, authData);
    return (
        <AuthContext.Provider value={[authData, dispatch]}>
            {children}
        </AuthContext.Provider>
    );
}
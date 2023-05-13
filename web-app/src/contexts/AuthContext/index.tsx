import React, { Dispatch, useReducer } from "react";
import { AuthActions, AuthActionsKind, AuthData } from "./types";
import useAuth from "../../services/useAuth";
import { useMutation } from "react-query";
import Cookies from "js-cookie";


const initialState: AuthData = {
    valid: false
};
export const AuthContext = React.createContext<[Partial<AuthData> | undefined, Dispatch<AuthActions>]>([initialState, (value: AuthActions) => null]);


export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authData, setAuthData] = React.useState<AuthData | undefined>(JSON.parse(localStorage.getItem('authData') as string))
    const { verify } = useAuth()
    const veifyMutation = useMutation(verify)
    function clearAuthData() {
        localStorage.clear()
        setAuthData({ valid: false })
        Cookies.remove('x-access-token')
    }
    const reducer = (state = authData, action: AuthActions) => {
        switch (action.type) {
            case AuthActionsKind.VERIFY:
                if (!!Cookies.get('x-access-token')) {
                    veifyMutation.mutate(undefined, {
                        onError: () => {
                            clearAuthData()
                        },
                        onSuccess: () => {
                            setAuthData(curr => ({ ...curr, valid: true }))
                        },
                    })
                    return authData
                }

                clearAuthData()
                return authData
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
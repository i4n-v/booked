import React, { Dispatch, useReducer } from "react";
import { AuthActions, AuthActionsKind, AuthData } from "./types";


const initialState: AuthData = {
};
export const AuthContext = React.createContext<[Partial<AuthData> | undefined, Dispatch<AuthActions>]>([initialState, (value: AuthActions) => null]);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authData, setAuthData] = React.useState<AuthData>(JSON.parse(localStorage.getItem('authData') as string))

    const reducer = (state = authData, action: AuthActions) => {
        switch (action.type) {
            case AuthActionsKind.VERIFY:
                return {}
            case AuthActionsKind.SET_USER_DATA:
                localStorage.setItem('authData', JSON.stringify({
                    ...authData,
                    userData: action.payload?.userData
                }))
                setAuthData(JSON.parse(localStorage.getItem('authData') as string))
                return authData
        }
    };
    const [state, dispatch] = useReducer(reducer, authData);
    return (
        <AuthContext.Provider value={[authData, dispatch]}>
            {children}
        </AuthContext.Provider>
    );
}
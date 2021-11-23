import React from "react";

export function useAuth() {
    const [token, setToken] = React.useState(null);
    const [userInfo, setUserInfo] = React.useState({});
    const [ready, setReady] = React.useState(false);

    const login = React.useCallback((jwtToken, userInfo) => {
        setToken(jwtToken);
        setUserInfo(userInfo);

        localStorage.setItem("userData", JSON.stringify({token: jwtToken, info: userInfo}));
    }, [])

    const logout = React.useCallback(() => {
        setToken(null);
        setUserInfo({});

        localStorage.removeItem("userData");
    }, [])

    React.useCallback(() => {
        const { token, info } = JSON.parse(localStorage.getItem("userData"));

        if (token) {
            login(token, info);
        }
        
        setReady(true);
    }, [login]);

    return { token, userInfo, login, logout, ready };
}
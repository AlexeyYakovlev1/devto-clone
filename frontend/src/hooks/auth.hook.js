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

    React.useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userData"));

        if (data && data.token) {
            login(data.token, data.info);
        }

        setReady(true);
    }, [login]);

    return { token, userInfo, login, logout, ready };
}
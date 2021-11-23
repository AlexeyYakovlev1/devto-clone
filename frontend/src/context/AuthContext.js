import React from "react";

export const AuthContext = React.createContext({
    token: null, userInfo: {}, login: function() {}, logout: function() {}, ready: false, isAuth: false
});
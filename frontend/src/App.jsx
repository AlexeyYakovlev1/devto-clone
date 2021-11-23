import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/auth.hook";
import { useRoutes } from "./Routes";

const App = () => {
  const { token, userInfo, login, logout, ready } = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);

  return (
    <AuthContext.Provider value={{
      token, userInfo, login, logout, ready
    }}>
      <Router>
        <div className="app">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

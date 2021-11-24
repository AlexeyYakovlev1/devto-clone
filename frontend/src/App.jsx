import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/auth.hook";
import Container from '@mui/material/Container';
import { useRoutes } from "./Routes";
import { CircularProgress } from "@mui/material";
import Header from "./components/Header";

const App = () => {
  const { token, userInfo, login, logout, ready } = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);

  if (!ready) {
    return <CircularProgress sx={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }} />
  }

  return (
    <AuthContext.Provider value={{
      token, userInfo, login, logout, ready, isAuth
    }}>
      <Router>
        <div className="app">
          {isAuth && <Header />}
          <Container maxWidth="lg">
            {routes}
          </Container>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

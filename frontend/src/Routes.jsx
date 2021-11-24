import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import propTypes from "prop-types";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";

export const useRoutes = (isAuth) => {
    if (!isAuth) {
        return (
            <Switch>
                <Route exact path="/" component={Register} />
                <Route exact path="/login" component={Login} />
                <Redirect to="/" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Redirect to="/" />
        </Switch>
    )
}

useRoutes.propTypes = {
    isAuth: propTypes.bool.isRequired
}
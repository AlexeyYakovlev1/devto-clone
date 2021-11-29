import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import propTypes from "prop-types";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewPost from "./pages/NewPost";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import Settings from "./pages/Settings";

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
            <Route exact path="/new" component={NewPost} />
            <Route exact path="/settings" component={Settings} />
            <Route path="/post/:id" component={PostPage} />
            <Route path="/user/:id" component={ProfilePage} />
            <Redirect to="/" />
        </Switch>
    )
}

useRoutes.propTypes = {
    isAuth: propTypes.bool.isRequired
}
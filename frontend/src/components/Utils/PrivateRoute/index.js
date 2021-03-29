import React, { useContext } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { UserContext } from "../../../App.js";

export const PrivateRoute = ({
  component: Component,
  exact,
  path,
  profile
}) => {
  const auth = useContext(UserContext);
  const location = useLocation();
  return (
    <Route exact={exact} path={path}>
      {auth?.user ? (
        <Component profile={profile} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location }
          }}
        />
      )}
    </Route>
  );
};

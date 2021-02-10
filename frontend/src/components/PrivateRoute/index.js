import React, { useContext } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { UserContext } from "../../App.js";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useContext(UserContext);
  const location = useLocation();
  return (
    <Route {...rest}>
      {auth?.user ? (
        <Component />
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

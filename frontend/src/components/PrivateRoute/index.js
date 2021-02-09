import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import UserContext from "../UserContext/index.js";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={props =>
        auth.user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

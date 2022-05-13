import * as React from "react";
import { Route, useNavigate, RouteProps } from "react-router-dom";

// eslint-disable-next-line react-hooks/rules-of-hooks

export interface PrivateRouteProps {}

export function PrivateRoute(props: PrivateRouteProps) {
  let navigate = useNavigate();
  const isLogin = Boolean(localStorage.getItem("access_token"));
  if (!isLogin) return navigate("/login");
  return <Route {...props} />;
}

import React from "react";
import { ROLE } from "../constants/enums";
import { Navigate } from "react-router-dom";
import AccessDenied from "../pages/authPage/DeniedPage/AccessDenied";

type Props = {
  children?: JSX.Element;
  roles: Array<ROLE>;
};

export default function PrivateRoute(props: Props) {
  const { children, roles } = props;
  const isAuthenticated = true;
  const role = ROLE.PATIENT;

  console.log("children", children);
  const userHasRequiredRole = roles.includes(role) ? true : false;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }

  if (isAuthenticated && !userHasRequiredRole) {
    return <AccessDenied />;
  }

  return <>{children}</>;
}

import React from "react";
import { Navigate } from "react-router-dom";
import AccessDenied from "../pages/authPage/DeniedPage/AccessDenied";
import { useSelector } from "react-redux";
import { RootState } from "../redux/configStore";
import { getStorage } from "../utils/localStorage";
import { AUTH } from "../constants/constants";

type Props = {
  children?: JSX.Element;
  roles: string[];
};

export default function PrivateRoute(props: Props) {
  const { currentUser } = useSelector((state: RootState) => state.userSlice);

  const { children, roles } = props;

  const isAuthenticated = getStorage(AUTH);
  const role = currentUser.role;
  if (!role && isAuthenticated) return <></>;

  const userHasRequiredRole = role && roles.includes(role);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }

  if (isAuthenticated && !userHasRequiredRole) {
    return <AccessDenied />;
  }

  return <>{children}</>;
}

import React, { useEffect } from "react";
import { RootState } from "../redux/configStore";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ROLE } from "../constants/enums";
import { getStorage } from "../utils/localStorage";
import { AUTH } from "../constants/constants";

type Props = {};

export default function AuthTemplate({}: Props) {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.userSlice);
  const auth = getStorage(AUTH);
  const location = useLocation();
  const pathNameCurentURL = location.pathname;
  const arrPathNameCheck = ["/", "/login", "/sign-up"];
  const checkPathName = arrPathNameCheck.includes(pathNameCurentURL);

  const redirect = () => {
    if (auth && currentUser) {
      if (currentUser.role === ROLE.DOCTOR && checkPathName) {
        navigate("/doctor/appointment");
        return;
      }

      if (currentUser.role === ROLE.PATIENT && checkPathName) {
        navigate("/search-doctor");
        return;
      }
    }

    if (!auth && location.pathname === "/") navigate("/home");
  };

  useEffect(() => {
    redirect();
  }, [auth, currentUser]);
  return (
    <>
      <Outlet />
    </>
  );
}

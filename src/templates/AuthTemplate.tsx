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

  const redirect = () => {
    if (auth && currentUser) {
      if (currentUser.role === ROLE.DOCTOR && location.pathname === "/") {
        navigate("/doctor/appointment");
        return;
      }

      if (currentUser.role === ROLE.PATIENT && location.pathname === "/") {
        navigate("/search-doctor");
        return;
      }
    }

    if (location.pathname === "/") navigate("/search-doctor");
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

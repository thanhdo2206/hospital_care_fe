import React, { useEffect } from "react";

import { useRoutes } from "react-router-dom";

import patientRoutes from "./PatientRoutes";
import doctorRoutes from "./DoctorRoutes";
import publicRoutes from "./PublicRoutes";
import { DispatchType } from "../redux/configStore";
import { useDispatch } from "react-redux";
import { getCurrentUserThunk } from "../redux/slices/userSlice";
import { getStorage } from "../utils/localStorage";
import { AUTH } from "../constants/constants";

type Props = {};

export default function AppRoutes({}: Props) {
  const dispatch: DispatchType = useDispatch();

  const auth = getStorage(AUTH);
  useEffect(() => {
    const getCurrentUserApi = async () => {
      if (auth) await dispatch(getCurrentUserThunk());
      return;
    };
    getCurrentUserApi();
  }, [auth]);

  let routes = useRoutes([...publicRoutes, ...patientRoutes, ...doctorRoutes]);
  return routes;
}

import React from "react";
import { RouteObject } from "react-router-dom";
import SignUp from "../pages/authPage/SignUp/SignUp";
import Login from "../pages/authPage/Login/Login";
import PageRequestVerifyEmail from "../pages/authPage/VerifyEmail/PageRequestVerifyEmail";
import PageVerifyEmail from "../pages/authPage/VerifyEmail/PageVerifyEmail";
import HomeTemplate from "../templates/HomeTemplate";
import AuthTemplate from "../templates/AuthTemplate";
import MainFindDoctor from "../pages/guestPages/findDoctorPage/MainFindDoctor";
import DetailExamination from "../pages/guestPages/detailExamination/DetailExamination";

const publicRoutes: RouteObject[] = [
  {
    path: "",
    element: <AuthTemplate />,
    children: [
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/request-verify-mail",
    element: <PageRequestVerifyEmail />,
  },
  {
    path: "/verify-email/:emailToken/:userId",
    element: <PageVerifyEmail />,
  },
  {
    path: "",
    element: <HomeTemplate />,
    children: [
      {
        path: "search-doctor",
        element: <MainFindDoctor />,
      },
      {
        path: "examination/detail/:id",
        element: <DetailExamination />,
      },
    ],
  },
  {
    path: "*",
    element: <div>Page Not Found</div>,
  },
];

export default publicRoutes;

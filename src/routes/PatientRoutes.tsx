import React from "react";
import { Route, RouteObject } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { ROLE } from "../constants/enums";

import Profile from "../pages/patientPages/Profile";
import HomeTemplate from "../templates/HomeTemplate";
import BookAppointment from "../pages/patientPages/bookAppointment/BookAppointment";

const patientRoutes: RouteObject[] = [
  {
    path: "/patient",
    element: (
      <PrivateRoute roles={[ROLE.PATIENT]}>
        <HomeTemplate />
      </PrivateRoute>
    ),
    children: [
      {
        path: "book-appointment/:id",
        element: <BookAppointment />,
      },
      { path: "profile", element: <Profile /> },
    ],
  },
];

export default patientRoutes;

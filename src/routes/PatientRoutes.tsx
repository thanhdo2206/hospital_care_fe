import React from "react";
import { Route, RouteObject } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { ROLE } from "../constants/enums";

import HomeTemplate from "../templates/HomeTemplate";
import BookAppointment from "../pages/patientPages/bookAppointment/BookAppointment";
import PatientDashBoard from "../pages/patientPages/patientDashboard/PatientDashboard";
import HistoryAppointment from "../pages/patientPages/historyAppointment/HistoryAppointment";
import PatientProfile from "../pages/patientPages/patientProfile/PatientProfile";

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
      {
        path: "dashboard",
        element: <PatientDashBoard />,
        children: [
          {
            path: "history-appointment",
            element: <HistoryAppointment />,
          },
          {
            path: "profile",
            element: <PatientProfile />,
          },
        ],
      },
    ],
  },
];

export default patientRoutes;

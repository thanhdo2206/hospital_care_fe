import React from "react";
import PrivateRoute from "./PrivateRoute";
import { ROLE } from "../constants/enums";
import { RouteObject } from "react-router-dom";
import MainDoctor from "../pages/doctorPages/homeDoctor/MainDoctor";
import AppointmentDoctor from "../pages/doctorPages/appointmentDoctor/AppointmentDoctor";
import AppointmentPatientOfDoctor from "../pages/doctorPages/appointmentDoctor/AppointmentPatientOfDoctor";
import ScheduleTiming from "../pages/doctorPages/scheduleTiming/ScheduleTiming";

const doctorRoutes: RouteObject[] = [
  {
    path: "/doctor",
    element: (
      <PrivateRoute roles={[ROLE.DOCTOR]}>
        <MainDoctor />
      </PrivateRoute>
    ),
    children: [
      {
        path: "appointment",
        element: <AppointmentDoctor />,
      },
      {
        path: "appointment/appointment-patient/:patientId",
        element: <AppointmentPatientOfDoctor />,
      },
      {
        path: "schedule-timing",
        element: <ScheduleTiming />,
      },
    ],
  },
];

export default doctorRoutes;

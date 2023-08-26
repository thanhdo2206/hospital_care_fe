import React from "react";
import PatientSidebar from "./PatientSidebar";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import "../../../assets/css/pages/patientPage/patientDashboard/patient_dashboard.css";

type Props = {};

export default function PatientDashBoard({}: Props) {
  return (
    <section className="patient_dashboard">
      <PatientSidebar />

      <div className="patient_dasboard_outlet">
        <Outlet />
      </div>
    </section>
  );
}

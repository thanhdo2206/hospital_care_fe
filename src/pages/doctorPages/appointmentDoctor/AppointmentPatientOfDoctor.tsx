import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import "../../../assets/css/pages/doctorPage/appointmentDoctor/appointment_patient_of_doctor.css";
import {
  IAppointment,
  IAppointmentPatientSpecificOfDoctor,
} from "../../../interface/AppointmentInterface";
import { getAllAppointmentPatientForDoctorService } from "../../../services/appointmentService";
import TableAppointment from "./TableAppointment";
import { IMedicalExamination } from "../../../interface/MedicalExaminationInterface";
import Avatar from "react-avatar";

type Props = {};

export default function AppointmentPatientOfDoctor({}: Props) {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const medicalExaminationRef = useRef<IMedicalExamination>();
  const params = useParams();

  const getAllAppointmentPatientForDoctor = async () => {
    const patientId: string | undefined = params.patientId;
    const result: IAppointmentPatientSpecificOfDoctor =
      await getAllAppointmentPatientForDoctorService(patientId as string);
    medicalExaminationRef.current = result.medicalExamination;
    setAppointments(result.listAppointment);
  };

  useEffect(() => {
    getAllAppointmentPatientForDoctor();
  }, [params.patientId]);

  const arrInforPatient = [
    {
      title: "Gender:",
      value: appointments[0]?.patient.gender ? "Male" : "Female",
    },
    {
      title: "Age:",
      value: appointments[0]?.patient.age,
    },
    {
      title: "Phone:",
      value: appointments[0]?.patient.phoneNumber,
    },
    {
      title: "Address:",
      value: appointments[0]?.patient.address,
    },
  ];

  return (
    <div className="container__patient--doctor">
      <div className="card widget__profile-paient">
        <div className="card__header">
          <div className="profile__info-widget">
            {appointments[0]?.patient.avatar ? (
              <img src={appointments[0]?.patient.avatar} alt="" />
            ) : (
              <Avatar facebookId="100008343750912" size="100" round={true} />
            )}
            <h3>
              {appointments[0]?.patient.firstName}{" "}
              {appointments[0]?.patient.lastName}
            </h3>
          </div>
        </div>
        <div className="card__body">
          <ul>
            {arrInforPatient.map((item, index) => {
              return (
                <li key={index}>
                  <p className="title__information">{item.title}</p>
                  <span className="value">{item.value}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="table__appointment">
        <TableAppointment
          appointments={appointments}
          medicalExamination={medicalExaminationRef.current}
          getAllAppointmentPatientForDoctor={getAllAppointmentPatientForDoctor}
        />
      </div>
    </div>
  );
}

import { IMedicalExamination } from "./MedicalExaminationInterface";
import { ITimeSlot } from "./TimeSlotInterface";
import { IUser } from "./UserInterface";

export interface IAppointment {
  id: number;
  createdAt: null;
  updatedAt: null;
  status: number;
  patientId: number;
  timeSlotId: number;
  patient: IUser;
  TimeSlot: ITimeSlot;
}

export interface IAppointmentPageable {
  pageIndex: number;
  totalPage: number;
  listAppointment: IAppointment[];
}

export interface IAppointmentPatientSpecificOfDoctor {
  listAppointment: IAppointment[];
  medicalExamination: IMedicalExamination;
}

export interface IHistoryAppointmentPatient {
  id: number;
  createdAt: null;
  updatedAt: null;
  status: number;
  patientId: number;
  timeSlotId: number;
  doctorId: number;
  departmentName: string;
  avatarDoctor: string;
  firstNameDoctor: string;
  lastNameDoctor: string;
  startTime: Date;
  duration: number;
  examinationPrice: number;
}

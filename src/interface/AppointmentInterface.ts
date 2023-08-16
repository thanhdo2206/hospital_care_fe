import { IMedicalExamination } from "./MedicalExaminationInterface";
import { ITimeSlot } from "./TimeSlotInterface";
import { IUser } from "./UserInterface";

export interface IAppointment {
  id: number;
  createdBy: null;
  modifiedBy: null;
  createdDate: Date;
  modifiedDate: Date;
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

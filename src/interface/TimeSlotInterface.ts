import { IMedicalExamination } from "./MedicalExaminationInterface";

export interface ITimeSlot {
  id: number;
  createdAt: null;
  updatedAt: null;
  startTime: string;
  duration: number;
  statusTimeSlot: boolean;
  examinationId: number;
  doctorId: number;
}

export interface ITimeSlotRequest {
  startTime: string;
  duration: number;
}

export interface ITimeSlotDetail {
  id: number;
  createdAt: null;
  updatedAt: null;
  startTime: string;
  duration: number;
  statusTimeSlot: boolean;
  examinationId: number;
  doctorId: number;
  medicalExamination: IMedicalExamination;
}

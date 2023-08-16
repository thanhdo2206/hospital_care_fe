import { IDepartment } from "./DepartmentInterface";
import { ITimeSlot } from "./TimeSlotInterface";

export interface IMedicalExamination {
  id: number;
  createdAt: null;
  updatedAt: null;
  examinationPrice: number;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
}

export interface IMedicalExaminationFilter {
  category: string[];
  minPrice: number;
  maxPrice: number;
}

export interface IMedicalExaminationTime {
  id: number;
  createdAt: null;
  updatedAt: null;
  examinationPrice: number;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  Department: IDepartment;
  timeSlots: ITimeSlot[];
}

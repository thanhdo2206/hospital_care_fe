import { IUser } from "./UserInterface";

export interface IFeedback {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  commentText: string;
  patientInformation: IUser;
}

export interface ICheckConditionFeedback {
  statusCode: number;
  message: string;
  isBooked: boolean;
}

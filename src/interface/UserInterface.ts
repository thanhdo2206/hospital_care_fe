import { ROLE } from "../constants/enums";

export interface IUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  email?: string;
  gender?: boolean;
  role?: string;
  avatar?: string;
  age?: number;
}

export interface IPatientRegister {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role?: string;
}

export interface IPatientLogin {
  email: string;
  password: string;
}

// export interface ILoginResponse {
//   auth:boolean;
//   messege:string;
//   accessToken:string;
// }
export interface IPatientRegister {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role?:string;
}

export interface IPatientLogin {
  email: string;
  password: string;
}

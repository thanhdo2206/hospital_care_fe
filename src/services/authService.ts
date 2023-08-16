import { IPatientRegister } from "../interface/UserInterface";
import requestApi from "../utils/requestApi/requestApi";

export const verifyEmailTokenService = async (
  emailToken: string,
  userId: string
): Promise<any> => {
  try {
    const response = await requestApi({
      method: "post",
      url: `/auth/verify-email`,
      data: { emailToken, userId },
    });
    return response.data;
  } catch (error: any) {
    const { data } = error.response;
    return data;
  }
};

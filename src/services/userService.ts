import { IPatientLogin, IPatientRegister } from "../interfaces/UserInterface";
import requestApi from "../utils/requestApi/requestApi";
import requestAuthApi from "../utils/requestApi/requestAuthApi";

export const signUpService = async (
  dataRegister: IPatientRegister
): Promise<any> => {
  try {
    const responseApi = await requestApi({
      method: "post",
      url: `/user/register`,
      data: dataRegister,
    });
    return responseApi.data;
  } catch (error: any) {
    const { data } = error.response;
    return data;
  }
};

export const loginService = async (dataLogin: IPatientLogin): Promise<any> => {
  try {
    const responseApi = await requestApi({
      method: "post",
      url: `/user/login`,
      data: dataLogin,
    });
    return responseApi.data;
  } catch (error: any) {
    const { data } = error.response;
    return data;
  }
};

export const refreshTokenService = async (): Promise<any> => {
  console.log("refresh token service");
  try {
    const responseApi = await requestApi({
      method: "post",
      url: `/user/refresh-token`,
    });
    return responseApi.data;
  } catch (error: any) {
    const { data } = error.response;
    return data;
  }
};

export const logoutService = async (): Promise<any> => {
  try {
    const responseApi = await requestAuthApi({
      method: "post",
      url: `/user/logout`,
    });
    return responseApi.data;
  } catch (error: any) {
    const { data } = error.response;
    return data;
  }
};

export const getCurrentUserService = async (): Promise<any> => {
  try {
    const responseApi = await requestAuthApi({
      method: "get",
      url: `/user`,
    });
    console.log("getCurrentUserService res", responseApi);
    return responseApi.data;
  } catch (error: any) {
    const { data } = error.response;
    return data;
  }
};

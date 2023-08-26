import { ACCESS_TOKEN } from "../constants/constants";
import {
  IPatientLogin,
  IPatientRegister,
  IUser,
} from "../interface/UserInterface";
import { setStorage } from "../utils/localStorage";
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
    const { auth, accessToken } = responseApi.data;
    setStorage(ACCESS_TOKEN, accessToken);
    setStorage("auth", auth);

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
    return responseApi.data;
  } catch (error: any) {
    const { data } = error.response;
    return data;
  }
};

export const updateProfileUserService = async (
  dataUpdate: IUser
): Promise<any> => {
  try {
    const responseApi = await requestAuthApi({
      method: "patch",
      url: `/user`,
      data: dataUpdate,
    });
    return responseApi.data;
  } catch (error: any) {
    const { data } = error.response;
    return data;
  }
};

export const uploadAvatarUserService = async (formData: any): Promise<any> => {
  try {
    const responseApi = await requestAuthApi({
      method: "post",
      url: `/user/upload-avatar`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return responseApi.data;
  } catch (error: any) {
    const { data } = error.response;
    return data;
  }
};

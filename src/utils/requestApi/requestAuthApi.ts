import axios from "axios";
import { refreshTokenService } from "../../services/userService";

const requestAuthApi = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_BASE_URL_API}`,
});

requestAuthApi.interceptors.response.use(
  (res) => {
    console.log("res request auth api", res);
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    console.log("err.response", err.response);

    if (err.response && err.response.status === 401) {
      // Access Token was expired

      try {
        const rs = await refreshTokenService();
        console.log("refresh token", rs);

        return requestAuthApi(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }

    return Promise.reject(err);
  }
);

export default requestAuthApi;

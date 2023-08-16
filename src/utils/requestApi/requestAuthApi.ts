import axios from "axios";
import { ACCESS_TOKEN } from "../../constants/constants";
import { getStorage } from "../localStorage";

const requestAuthApi = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL_API}`,
});

requestAuthApi.interceptors.request.use(
  (config) => {
    //Cấu hình tất cả header gửi đi đều có bearer token (token authorization đăng nhập)
    // config.headers = {
    //   ...config.headers,
    //   Authorization: "Bearer " + settings.getStore(ACCESS_TOKEN)
    // };

    config.headers.Authorization = getStorage(ACCESS_TOKEN);

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default requestAuthApi;

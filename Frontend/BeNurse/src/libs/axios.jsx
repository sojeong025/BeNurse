import axios from "axios";

const SERVER_ADDRESS = `http://k9e105.p.ssafy.io:9000`;

export const customAxios = axios.create({
  baseURL: `${SERVER_ADDRESS}/api/benurse/`,
  headers: {
    "Content-Type": "application/json",
  },
});

customAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

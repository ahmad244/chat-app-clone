import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
console.log(
  "import.meta.env.VITE_REACT_APP_API_URL --->",
  import.meta.env.VITE_REACT_APP_API_URL
);

console.log("import.meta.env.DEV", import.meta.env.DEV);

axios.interceptors.response.use(
  function (response) {
    console.log(response);
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export const callRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


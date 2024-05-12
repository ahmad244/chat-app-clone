import { callRequest } from "./axiosConfig";

export const LoginUser = async (email, password) => {
  try {
    const response = await callRequest.post(
      "/auth/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      success: response.status === 200 || response.status === 201,
      user: response.data,
    };
  } catch (error) {
    return error.response;
  }
};

export const RegisterUser = async (email, password, phoneNumber) => {
  console.log("Register user api call", email, password, phoneNumber);
  try {
    const response = await callRequest.post(
      "/auth/register",
      {
        email: email,
        password: password,
        phoneNumber: phoneNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      success: response.status === 200 || response.status === 201,
      user: response.data,
    };
  } catch (error) {
    return error.response;
  }
};

import { callRequest } from "./axiosConfig";

export const SendChat = async (conversationId, message) => {
  try {
    const response = await callRequest.post(
      `chat/${conversationId}`,
      { message }
    );
    return {
      success: response.status === 200 || response.status === 201,
      data: response.data,
    };
  } catch (error) {
    return error.response;
  }
};


export const GetChats = async (conversationId) => {
  try {
    const response = await callRequest.get(`chat/${conversationId}`);
    return {
      success: response.status === 200 || response.status === 201,
      data: response.data,
    };
  } catch (error) {
    return error.response;
  }
}
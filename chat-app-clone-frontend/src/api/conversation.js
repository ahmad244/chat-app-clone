import { callRequest } from "./axiosConfig";

export const CreateConversation = async (name, memberIds) => {
  try {
    const response = await callRequest.post("/conversation/create", {
      name,
      memberIds,
    });

    return {
      success: response.status === 200 || response.status === 201,
      data: response.data,
    };
  } catch (error) {
    return error.response;
  }
};

export const GetConversations = async () => {
  try {
    const response = await callRequest.get("/conversation");
    return {
      success: response.status === 200 || response.status === 201,
      data: response.data,
    };
  } catch (error) {
    return error.response;
  }
};


export const GetSelectedConversation = async (id) => {
  try {
    const response = await callRequest.get(`/conversation/${id}`);
    return {
      success: response.status === 200 || response.status === 201,
      data: response.data,
    };
  } catch (error) {
    return error.response;
  }
};

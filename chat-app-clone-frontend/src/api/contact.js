import Contacts from "../components/Contacts";
import { callRequest } from "./axiosConfig";

export const AddContact = async (contactId) => {
  try {
    const response = await callRequest.post("/contact/add", { contactId });
    return {
      success: response.status === 200 || response.status === 201,
      data: response.data,
    };
  } catch (error) {
    return error.response;
  }
};

export const GetContacts = async () => {
  try {
    const response = await callRequest.get("/contact");
    return {
      success: response.status === 200 || response.status === 201,
      data: response.data,
    };
  } catch (error) {
    return error.response;
  }
};

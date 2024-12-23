import { api } from "./api";

export const addLicense = async (formData) => {
  try {
    const response = await api.post("licenses/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

import { api } from "./api";

export const createOrganization = async (formData) => {
  try {
    const response = await api.post("organization/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/v1/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

//Auth API
export const login = async (username, password) => {
  try {
    const response = await api.post("/auth/login/", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const register = async (
  username,
  email,
  password,
  organization_name
) => {
  try {
    const response = await api.post("/auth/register/", {
      username,
      email,
      password,
      organization_name,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

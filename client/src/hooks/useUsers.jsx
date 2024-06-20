import apiClient from "./useAxiosAuth";

export const getUsers = async () => {
  const response = await apiClient.get("/auth/users");
  console.log("getUsers front: ", response.data);
  return response.data;
};

export const createUser = async (formData) => {
  const response = await apiClient.post("/auth/register", formData);
  return response.data;
};

export const updateUser = async (userId, formData) => {
  const response = await apiClient.put(`/users/${userId}`, formData);
  return response.data;
};

export const deleteUser = async (email) => {
  const response = await apiClient.delete(`/auth/email/${email}`);
  return response.data;
};

export const userService = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};

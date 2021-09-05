import { apiClient } from "../../utils/api";

export async function regist(
  name: string,
  email: string,
  password: string,
  password_confirmation: string
) {
  await apiClient.get("/sanctum/csrf-cookie");
  const response = await apiClient
    .post("/regist", { name, email, password, password_confirmation })
    .catch((err) => err.response);
  return response;
}

import { apiClient } from "../../utils/api";

export async function getCategoryList(): Promise<any> {
  const response = await apiClient
    .get("/expense/category/list")
    .catch((err) => err.response);

  return response;
}

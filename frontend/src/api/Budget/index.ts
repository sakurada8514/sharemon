import { apiClient } from "../../utils/api";

export async function registBudget(category_id: number, budget: string) {
  const response = await apiClient
    .post("/budget", { category_id, budget })
    .catch((err) => err.response);
  return response;
}

export async function editBudget(
  id: string,
  category_id: number,
  budget: string
) {
  const response = await apiClient
    .put("/budget/" + id, { category_id, budget })
    .catch((err) => err.response);
  return response;
}

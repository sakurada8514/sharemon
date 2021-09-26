import { apiClient } from "../../utils/api";

//TODO::API関数まとめる
export async function getExpenseList(url: string): Promise<any> {
  const response = await apiClient.get(url).then((res) => res.data.expenseList);

  return response;
}

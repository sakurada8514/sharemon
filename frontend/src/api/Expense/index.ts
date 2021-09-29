import { apiClient } from "../../utils/api";

export async function expenseListfetcher(
  url: string,
  date: string
): Promise<any> {
  const response = await apiClient
    .get(url, {
      params: {
        date: date,
      },
    })
    .then((res) => res.data.expenseList);

  return response;
}

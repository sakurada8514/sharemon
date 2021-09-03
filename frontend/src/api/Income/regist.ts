import { apiClient } from "../../utils/api";

import { setRequestParams, formatDate } from "../../utils/handy";

export async function registIncome(
  income: string,
  regist_date: Date,
  category_id: number,
  comment: string,
  repetition_flg: boolean
): Promise<any> {
  const formData = {
    income: income,
    regist_date: formatDate(regist_date, "yyyy-MM-dd HH:mm:ss"),
    category_id: category_id,
    comment: comment,
    repetition_flg: repetition_flg ? 1 : 0,
  };
  const params = setRequestParams(formData);
  const response = await apiClient
    .post("/income/regist", params)
    .catch((err) => err.response);

  return response;
}

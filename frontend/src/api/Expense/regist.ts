import { apiClient } from "../../utils/api";

import { setRequestParams, formatDate } from "../../utils/handy";

export async function registExpense(
  expense: string,
  regist_date: Date,
  category_id: number,
  comment: string,
  repetition_flg: boolean,
  receipt_img: any
): Promise<any> {
  const formData = {
    expense: expense,
    regist_date: formatDate(regist_date, "yyyy-MM-dd HH:mm:ss"),
    category_id: category_id,
    comment: comment,
    repetition_flg: repetition_flg ? 1 : 0,
    receipt_img: receipt_img,
  };
  const params = setRequestParams(formData);
  console.log(params);
  const response = await apiClient
    .post("/expense", params)
    .catch((err) => err.response);

  return response;
}

export async function editExpense(
  id: string,
  expense: string,
  regist_date: Date,
  category_id: number,
  comment: string,
  repetition_flg: boolean,
  receipt_img: any
): Promise<any> {
  const formData = {
    expense: expense,
    regist_date: formatDate(regist_date, "yyyy-MM-dd HH:mm:ss"),
    category_id: category_id,
    comment: comment,
    repetition_flg: repetition_flg ? 1 : 0,
    receipt_img: receipt_img,
  };
  const params = setRequestParams(formData);
  params.append("_method", "put");
  const response = await apiClient
    .post("/expense/" + id, params)
    .catch((err) => err.response);

  return response;
}

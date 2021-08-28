import axios from "axios";

import { setRequestParams, formatDate } from "../Core/BaseApi";

export async function registExpense(
    expense,
    regist_date,
    category_id,
    comment,
    repetition_flg,
    receipt_img
) {
    const formData = {
        expense: expense,
        regist_date: formatDate(regist_date, "yyyy-MM-dd HH:mm:ss"),
        category_id: category_id,
        comment: comment,
        repetition_flg: repetition_flg ? 1 : 0,
        receipt_img: receipt_img,
    };
    const params = setRequestParams(formData);
    const response = await axios
        .post("/api/expense/regist", params)
        .catch((err) => err.response);

    return response;
}

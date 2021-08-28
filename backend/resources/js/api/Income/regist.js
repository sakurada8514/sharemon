import axios from "axios";

import { setRequestParams, formatDate } from "../Core/BaseApi";

export async function registIncome(
    income,
    regist_date,
    category_id,
    comment,
    repetition_flg
) {
    const formData = {
        income: income,
        regist_date: formatDate(regist_date, "yyyy-MM-dd HH:mm:ss"),
        category_id: category_id,
        comment: comment,
        repetition_flg: repetition_flg ? 1 : 0,
    };
    const params = setRequestParams(formData);
    const response = await axios
        .post("/api/income/regist", params)
        .catch((err) => err.response);

    return response;
}

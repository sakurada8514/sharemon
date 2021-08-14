import axios from "axios";

export async function registExpense(
    expense,
    regist_date,
    category_id,
    comment,
    repetition_flg
) {
    const response = await axios
        .post("/api/expense/regist", {
            expense,
            regist_date,
            category_id,
            comment,
            repetition_flg,
        })
        .catch((err) => err.response);

    return response;
}

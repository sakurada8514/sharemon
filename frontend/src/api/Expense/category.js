import axios from "axios";

export async function getCategoryList() {
    const response = await axios
        .get("/api/expense/category/list")
        .catch((err) => err.response);

    return response;
}

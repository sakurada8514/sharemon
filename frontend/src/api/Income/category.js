import axios from "axios";

export async function getCategoryList() {
    const response = await axios
        .get("/api/income/category/list")
        .catch((err) => err.response);

    return response;
}

import axios from "axios";

export async function regist(name, email, password, password_confirmation) {
    await axios.get("/sanctum/csrf-cookie");
    const response = await axios
        .post("/api/regist", { name, email, password, password_confirmation })
        .catch((err) => err.response);
    return response;
}

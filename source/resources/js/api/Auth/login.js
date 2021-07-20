import axios from "axios";

export async function login(email, password, remember) {
    // ログイン時にCSRFトークンを初期化
    await axios.get("/sanctum/csrf-cookie");
    const response = await axios
        .post("/api/login", { email, password, remember })
        .catch((err) => err.response);
    return response;
}

export async function logout() {
    const response = await axios
        .get("/api/logout")
        .catch((err) => err.response);
    console.log(response.status);
    return response.status;
}

export async function currentUser() {
    const response = await axios.get("/api/user");
    return response.data.user;
}

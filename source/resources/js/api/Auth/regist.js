import axios from "axios";

export async function regist(name, email, password, password_confirmation) {
    await axios.get("/sanctum/csrf-cookie");
    const response = await axios
        .post("/api/regist", { name, email, password, password_confirmation })
        .catch((err) => err.response);
    return response;
}

export async function inviteRegist(
    name,
    email,
    password,
    password_confirmation,
    room_id
) {
    await axios.get("/sanctum/csrf-cookie");
    const response = await axios
        .post("/api/regist/invite", {
            name,
            email,
            password,
            password_confirmation,
            room_id,
        })
        .catch((err) => err.response);
    return response;
}

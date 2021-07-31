export async function createInviteUrl(room_name) {
    const response = await axios
        .get("/api/regist/url")
        .catch((err) => err.response);
    return response;
}

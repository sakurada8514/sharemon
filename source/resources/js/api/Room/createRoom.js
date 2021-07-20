export async function createRoom(room_name) {
    const response = await axios
        .post("/api/room/create", { room_name })
        .catch((err) => err.response);
    return response;
}

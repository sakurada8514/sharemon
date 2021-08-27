import axios from "axios";

export async function currentRoom() {
    const response = await axios.get("/api/room").catch((err) => err.response);
    return response;
}

export async function createRoom(room_name) {
    const response = await axios
        .post("/api/room/create", { room_name })
        .catch((err) => err.response);
    return response;
}

export async function getMember() {
    const response = await axios
        .get("/api/room/member")
        .catch((err) => err.response);
    return response;
}

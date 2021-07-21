export async function currentRoom() {
    const response = await axios.get("/api/room").catch((err) => err.response);
    return response;
}

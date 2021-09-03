import { apiClient } from "../../utils/api";

export async function createRoom(room_name: string): Promise<any> {
  const response = await apiClient
    .post("/room/create", { room_name })
    .catch((err) => err.response);
  return response;
}

export async function getMember(): Promise<any> {
  const response = await apiClient
    .get("/room/member")
    .catch((err) => err.response);
  return response;
}

import { apiClient } from "../../utils/api";

export async function createRoom(room_name: string): Promise<any> {
  const response = await apiClient
    .post("/room", { room_name })
    .catch((err) => err.response);
  return response;
}

//TODO:: 移動
export async function getMember(): Promise<any> {
  const response = await apiClient.get("/member").catch((err) => err.response);
  return response;
}

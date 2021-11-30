import { apiClient } from "../../utils/api";
import type { Member } from "types/entity/member";

export async function createRoom(room_name: string): Promise<any> {
  const response = await apiClient
    .post("/room", { room_name })
    .catch((err) => err.response);
  return response;
}

export async function getRoomName(url: string, roomId: string): Promise<any> {
  const response = await apiClient
    .get(url + roomId)
    .then((res) => res.data.detail.room_name);
  return response;
}

//TODO:: 移動
export async function getMember(url: string): Promise<Member[]> {
  const response = await apiClient.get(url).then((res) => res.data.memberList);
  return response;
}

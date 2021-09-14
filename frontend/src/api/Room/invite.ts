import { apiClient } from "../../utils/api";

export async function createInviteUrl(): Promise<any> {
  const response = await apiClient
    .get("/room/invite/url")
    .catch((err) => err.response);
  return response;
}

export async function inviteRegist(
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
  room_id: string | null, // TODO:: nullにならないように処理追加
  token: string | null
): Promise<any> {
  await apiClient.get("/sanctum/csrf-cookie");
  const response = await apiClient
    .post("/regist/invite", {
      name,
      email,
      password,
      password_confirmation,
      room_id,
      token,
    })
    .catch((err) => err.response);
  return response;
}

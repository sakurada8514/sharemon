import { apiClient } from "../../utils/api";
import type { User } from "types/entity/user";

export async function login(
  email: string,
  password: string,
  remember: boolean
): Promise<any> {
  // ログイン時にCSRFトークンを初期化
  const r = await apiClient.get("/csrf-cookie");
  console.log(r);

  const response = await apiClient
    .post("/login", { email, password, remember })
    .catch((err) => err.response);
  return response;
}

export async function logout(): Promise<any> {
  const response = await apiClient.post("/logout").catch((err) => err.response);

  return response.status;
}

export async function currentUser(): Promise<User> {
  const response = await apiClient.get("/user");
  console.log(response.data.user);

  return response.data.user;
}

export async function resetPassword(email: string): Promise<any> {
  const response = await apiClient
    .post("/password/reset", { email })
    .catch((err) => err.response);

  return response;
}

export async function reregistPassword(
  token: string | null, // TODO:: nullにならないように処理追加
  email: string | null,
  password: string,
  password_confirmation: string
): Promise<any> {
  const response = await apiClient
    .post("/password/reregist", {
      email,
      token,
      password,
      password_confirmation,
    })
    .catch((err) => err.response);

  return response;
}

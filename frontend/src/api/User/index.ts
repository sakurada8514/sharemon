import { apiClient } from "../../utils/api";

import { setRequestParams, formatDate } from "../../utils/handy";

export async function editProfile(
  id: number,
  name: string,
  icon: any
): Promise<any> {
  const formData = {
    name: name,
    icon: icon,
  };
  const params = setRequestParams(formData);
  params.append("_method", "put");
  const response = await apiClient
    .post("/member/" + id, params)
    .catch((err) => err.response);

  return response;
}

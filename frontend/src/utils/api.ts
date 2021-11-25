import axios from "axios";

// export const apiClient = axios.create({
//   baseURL: "http://localhost:8080/api",
//   withCredentials: true,
// });
export const apiClient = axios.create({
  baseURL: "https://sharemon.xyz",
  withCredentials: true,
});

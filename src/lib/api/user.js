import { serverFetch } from "../core/server";

export const getAllUser = async () => {
  const res = await serverFetch("api/users");
  return res;
};

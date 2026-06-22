import { serverDelete, serverFetch, serverUpdate } from "../core/server";

export const getAllUser = async () => {
  const res = await serverFetch("api/users");
  return res;
};

export const userRoleUpdate = async (userInfo) => {
  const res = await serverUpdate(`api/userRole`, userInfo);
  return res;
};

export const userDelete = async (userId) => {
  const res = await serverDelete(`api/userDelete/${userId}`);
  return res;
};

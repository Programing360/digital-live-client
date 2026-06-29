import { serverFetchById, serverMutation } from "../core/server";

export const userComment = async (userInfo) => {
  const res = await serverMutation("api/comment", userInfo);

  return res;
};
export const getComment = async (userId) => {

  const res = await serverFetchById(`api/comment/${userId}`);

  return res;
};

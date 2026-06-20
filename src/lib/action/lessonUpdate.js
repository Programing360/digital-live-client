import { serverUpdate } from "../core/server";

export const lessonUpdate = async (id, updateData) => {
  const res = await serverUpdate(`api/lessonUpdate/${id}`, updateData);
  return res;
};

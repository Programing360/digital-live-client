import { serverUpdate } from "../core/server";

export const lessonUpdate = async (id, updateData) => {
  // console.log(id);
  const res = await serverUpdate(`api/lessonUpdate/${id}`, updateData);
  return res;
};

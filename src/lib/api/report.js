import { serverDelete, serverFetch } from "../core/server";

export const getReport = async () => {
  const res = await serverFetch("api/report");
  return res;
};

export const reportRecover =  async(id) => {
  const res = await serverDelete(`api/report/${id}`)
  return res
}
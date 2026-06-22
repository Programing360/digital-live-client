import { serverDelete, serverFetch } from "../core/server";

export const getAllReport = async () => {
  const res = await serverFetch("api/reports");
  return res;
};
export const deleteReportById = async (id) => {
  const res = await serverDelete(`api/reports/${id}`);
  return res;
};



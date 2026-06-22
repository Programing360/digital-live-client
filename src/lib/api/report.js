import { serverFetch } from "../core/server";

export const getReport = async () => {
  const res = await serverFetch("api/report");
  return res;
};

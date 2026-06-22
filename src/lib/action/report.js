import { serverMutation } from "../core/server";

export const userReport = async (reportInfo) => {
  const result = await serverMutation('api/report', reportInfo)
  return result
};

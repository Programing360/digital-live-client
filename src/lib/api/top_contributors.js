import { normalFetch } from "../core/server";

export const getTopContributors = async () => {
  const res = await normalFetch("api/topContributors");
  return res;
};

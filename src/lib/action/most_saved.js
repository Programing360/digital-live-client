import { normalFetch } from "../core/server";

export const mostSaveFeatured = async () => {
  const res = await normalFetch("api/lessons/most-saved");
  return res;
};

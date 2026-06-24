import { normalFetch } from "../core/server";

export const getSearch = async (search) => {
  const res = await normalFetch(`api/search?search=${search}`);
  return res
};

import { serverFetchById } from "../core/server";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;


export const allLessons = async () => {
  const res = await fetch(`${baseURL}/api/lessons`);
  return res.json();
};

export const getLessonsDetailsById = async (id) => {
   const res = await serverFetchById(`api/lesson/${id}`)
  return res
};

export const getLessonById = async (id) => {
  const res = await serverFetchById(`api/lessons/${id}`)
  return res
};


import { serverFetchById } from "../core/server";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;


export const allLessons = async () => {
  const res = await fetch(`${baseURL}/api/lessons`);
  return res.json();
};

// export const getLessonsById = async (lessonId) => {
//   const res = await fetch(`${baseURL}/api/lesson/${lessonId}`);
//   return res.json();
// };

export const getLessonById = async (lessonId) => {
  const res = await serverFetchById(`api/lessons/${lessonId}`)
  return res
};


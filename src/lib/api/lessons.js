const baseURL = process.env.NEXT_PUBLIC_BASE_URL;


export const allLessons = async () => {
  const res = await fetch(`${baseURL}/api/lessons`);
  return res.json();
};

export const getLessonsById = async (jobsId) => {
  const res = await fetch(`${baseURL}/api/lesson/${jobsId}`);
  return res.json();
};

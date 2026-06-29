import React from "react";
import AuthorLessonProfile from "./AuthorLessonProfile";
import { getUseSession } from "@/lib/core/session";
import { getLessonById } from "@/lib/api/lessons";
export const metadata = {
  title: 'User-Profile | Digital Life Lessons'
}
const page = async () => {
  const user = await getUseSession();

  // const allLesson = await allLessons();
  const lessonData = await getLessonById(user?.id);

  return (
    <div>
      <AuthorLessonProfile
        user={user}
        lessonData={lessonData}
        // totalLessons={totalLessons}
      ></AuthorLessonProfile>
    </div>
  );
};

export default page;

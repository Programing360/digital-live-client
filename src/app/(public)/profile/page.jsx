import React from "react";
import AuthorLessonProfile from "./AuthorLessonProfile";
import { getUseSession } from "@/lib/core/session";
import { allLessons, getLessonById } from "@/lib/api/lessons";

const page = async () => {
  const user = await getUseSession();

  const allLesson = await allLessons();
  const lessonData = await getLessonsDetailsById(id);

  const totalLessons = allLesson.filter(
    (lesson) => lesson.author.authorId === lessonData.author.authorId,
  );

  return (
    <div>
      <AuthorLessonProfile
        user={user}
        lessonData={lessonData}
        totalLessons={totalLessons}
      ></AuthorLessonProfile>
    </div>
  );
};

export default page;

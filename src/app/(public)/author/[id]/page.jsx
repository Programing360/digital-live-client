import React from "react";
import AuthorDashboardPage from "./AuthorDashboard";
import { allLessons, getLessonsDetailsById } from "@/lib/api/lessons";

const AuthorPage = async ({ params }) => {
  const { id } = await params;
  const allLesson = await allLessons();

  const lessonData = await getLessonsDetailsById(id);
  const totalLessons = allLesson.filter(
    (lesson) => lesson.author.authorId === lessonData.author.authorId,
  );

  console.log(lessonData);

  return (
    <div>
      <AuthorDashboardPage lessonData={lessonData} totalLessons={totalLessons}></AuthorDashboardPage>
    </div>
  );
};

export default AuthorPage;

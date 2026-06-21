import LessonDetails from "@/component/LessionsDetailsPage";
import OwnerGuard from "@/component/OwnerGuard";
import { allLessons, getLessonsDetailsById, lessonLikes } from "@/lib/api/lessons";
import { getUseSession, requiredRole } from "@/lib/core/session";
import { notFound } from "next/navigation";
import React from "react";

const LessonDetailsPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUseSession();

  const allLesson = await allLessons()
  const lessonData = await getLessonsDetailsById(id);
    

    const totalLessons = allLesson.filter(lesson => lesson.author.authorId === lessonData.author.authorId)

  if (!lessonData) {
    return notFound();
  }
  console.log(totalLessons);

  if (
    lessonData.visibility === "Private" &&
    lessonData.author.authorId !== user?.id
  ) {
    return <OwnerGuard ownerId={user?.id} user={user?.id}></OwnerGuard>;
  }

  return <LessonDetails lessonData={lessonData} user={user} total={totalLessons} />;
};

export default LessonDetailsPage;

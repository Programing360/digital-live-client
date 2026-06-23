import LessonDetails from "@/component/LessionsDetailsPage";
import OwnerGuard from "@/component/OwnerGuard";
import { getComment } from "@/lib/api/comment";
import {
  allLessons,
  getLessonsDetailsById,
  lessonLikes,
} from "@/lib/api/lessons";
import { getUseSession, requiredRole } from "@/lib/core/session";
import { notFound, redirect } from "next/navigation";
import React from "react";

const LessonDetailsPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUseSession();
  if (!user) {
    return redirect("/privateDashboard");
  }
  const getUserComment = await getComment(user?.id);
  console.log(getUserComment);
  const allLesson = await allLessons();
  const lessonData = await getLessonsDetailsById(id);

  const totalLessons = allLesson.filter(
    (lesson) => lesson.author.authorId === lessonData.author.authorId,
  );

  if (!lessonData) {
    return notFound();
  }

  if (
    lessonData.visibility === "Private" &&
    lessonData.author.authorId !== user?.id
  ) {
    return <OwnerGuard ownerId={user?.id} user={user?.id}></OwnerGuard>;
  }
  return (
    <LessonDetails lessonData={lessonData} user={user} total={totalLessons} getUserComment={getUserComment} />
  );
};

export default LessonDetailsPage;

import LessonDetails from "@/component/LessionsDetailsPage";
import OwnerGuard from "@/component/OwnerGuard";
import { getLessonsDetailsById, lessonLikes } from "@/lib/api/lessons";
import { getUseSession, requiredRole } from "@/lib/core/session";
import { notFound } from "next/navigation";
import React from "react";

const LessonDetailsPage = async ({ params }) => {
  const { id } = await params;

  const lessonData = await getLessonsDetailsById(id);

  if (!lessonData) {
    return notFound();
  }

  const user = await getUseSession();

  if (
    lessonData.visibility === "Private" &&
    lessonData.author.authorId !== user?.id
  ) {
    return <OwnerGuard ownerId={user?.id} user={user?.id}></OwnerGuard>;
  }

  return (
    <LessonDetails
      lessonData={lessonData}
      user={user}
    />
  );
};

export default LessonDetailsPage;

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
export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const { id } = await params
 
  // fetch data
  const product = await getLessonsDetailsById(id)
 
  // optionally access and extend (rather than replace) parent metadata
//   const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product.title,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  }
}
const LessonDetailsPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUseSession();
  const allLesson = await allLessons();
  const lessonData = await getLessonsDetailsById(id);
  const getUserComment = await getComment(id);


  if (!user) {
    return redirect("/auth/login");
  }
 

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
    <LessonDetails lessonData={lessonData} user={user} total={totalLessons} allLessons={allLesson} getUserComment={getUserComment} />
  );
};

export default LessonDetailsPage;

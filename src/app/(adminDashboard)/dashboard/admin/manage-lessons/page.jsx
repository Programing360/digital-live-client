export const dynamic = "force-dynamic";
import React, { Suspense } from "react";
import ManageLessons from "./ManageLesson";
import { allLessons } from "@/lib/api/lessons";
import { title } from "framer-motion/client";


export const metadata = {
  title: 'Manage-Lesson | Digital Life Lessons'
}

const ManageLessonPage = async () => {
  const allLesson = await allLessons();

  return (
    <Suspense fallback={<div>Loading Management Pipeline...</div>}>
      <ManageLessons allLesson={allLesson} />
    </Suspense>
  );
};

export default ManageLessonPage;

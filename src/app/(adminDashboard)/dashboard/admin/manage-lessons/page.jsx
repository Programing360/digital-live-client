export const dynamic = "force-dynamic";
import React from "react";
import ManageLessons from "./ManageLesson";
import { allLessons } from "@/lib/api/lessons";

const ManageLessonPage = async () => {
  const allLesson = await allLessons();
  return (
    <div>
      <ManageLessons allLesson={allLesson} />
    </div>
  );
};

export default ManageLessonPage;

import React from "react";
import MyLessonsDashboard from "./MyLesspnDashboard";
import { getUseSession } from "@/lib/core/session";
import { getLessonById } from "@/lib/api/lessons";

const MyLessonPage = async () => {
  const user = await getUseSession();

  const lessonData = await getLessonById(user?.id);

  return (
    <div>
      <MyLessonsDashboard lessonData={lessonData}></MyLessonsDashboard>
    </div>
  );
};

export default MyLessonPage;

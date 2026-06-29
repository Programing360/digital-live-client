import DashboardHome from "@/component/userDashboard/DashboardHome";
import { favoriteDataById } from "@/lib/api/favorite";
import { allLessons, getLessonById } from "@/lib/api/lessons";
import { getUseSession } from "@/lib/core/session";
import React from "react";
export const metadata = {
  title: 'User-Dashboard | Digital Life Lessons'
}
const page = async () => {
  const user = await getUseSession();
  const allLesson = await allLessons();
  const lessonData = await getLessonById(user?.id);
  const favorites = await favoriteDataById(user?.id);

  const myLesson = allLesson.filter((lesson) =>
    lesson.likes.includes(user?.id),
  );

  return (
    <div>
      <DashboardHome
        user={user}
        lessonData={lessonData}
        favorites={favorites}
        totalLikes={myLesson}
      ></DashboardHome>
    </div>
  );
};

export default page;

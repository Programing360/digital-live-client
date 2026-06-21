import DashboardHome from "@/component/userDashboard/DashboardHome";
import { favoriteDataById } from "@/lib/api/favorite";
import { allLessons, getLessonById } from "@/lib/api/lessons";
import { getUseSession, requiredRole } from "@/lib/core/session";
import React from "react";

const page = async () => {
  const user = await getUseSession();
  const allLesson = await allLessons();
  const lessonData = await getLessonById(user?.id);
  const favorites = await favoriteDataById(user?.id);

  const myLesson = allLesson.filter(
    (lesson) => lesson.author.authorId === user?.id,
  );

  const totalLikes = myLesson.reduce((sum, num) => sum + num.likesCount, 0);

  

  return (
    <div>
      <DashboardHome
        user={user}
        lessonData={lessonData}
        favorites={favorites}
        totalLikes={totalLikes}
      ></DashboardHome>
    </div>
  );
};

export default page;

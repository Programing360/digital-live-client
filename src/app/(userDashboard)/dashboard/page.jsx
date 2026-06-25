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

  // console.log(user, allLesson, lessonData, favorites);


  const myLesson = allLesson.filter(
    (lesson) => lesson.likes.includes(user?.id)
  );

  // console.log(myLesson);
  const totalLikes = myLesson.reduce((sum, num) => sum + num.likesCount, 0);

  // console.log(totalLikes);

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

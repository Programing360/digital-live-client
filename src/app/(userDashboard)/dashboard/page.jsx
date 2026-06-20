import DashboardHome from "@/component/userDashboard/DashboardHome";
import { favoriteDataById } from "@/lib/api/favorite";
import { allLessons, getLessonById } from "@/lib/api/lessons";
import { getUseSession } from "@/lib/core/session";
import React from "react";

const page = async () => {
  const user = await getUseSession();
   const allLesson = await allLessons()
  const lessonData = await getLessonById(user?.id);
   const favorites = await favoriteDataById(user?.id);
  

  console.log(allLesson);

  return (
    <div>
      <DashboardHome user={user} lessonData={lessonData} favorites={favorites}></DashboardHome>
    </div>
  );
};

export default page;

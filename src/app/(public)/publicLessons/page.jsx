import React from "react";

import LessonsFeed from "@/component/LessonsFeed";
import { allLessons } from "@/lib/api/lessons";
import { createFavoritesLesson } from "@/lib/action/favorites";

export const favoritesCounts = async (count) => {
 const data = await createFavoritesLesson(count);
 console.log(data);
};

const page = async () => {
  const lessonsData = await allLessons();
  //   console.log(lessonsData);

  return (
    // Inside your main feed layout wrapper:
    <div className=" container mx-auto">
      <LessonsFeed initialLessons={lessonsData} isUserPremium="Free" />
    </div>
  );
};

export default page;

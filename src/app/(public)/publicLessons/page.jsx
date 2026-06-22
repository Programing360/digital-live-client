import React from "react";

import LessonsFeed from "@/component/LessonsFeed";
import { allLessons } from "@/lib/api/lessons";
import { getUseSession } from "@/lib/core/session";
import { favoriteDataById } from "@/lib/api/favorite";

const page = async () => {
  const user = await getUseSession();
  const lessonsData = await allLessons();
  const favorites = await favoriteDataById(user?.id);

  return (
    // Inside your main feed layout wrapper:
    <div className=" container mx-auto">
      <LessonsFeed
        initialLessons={lessonsData}
        isUserPremium="Free"
        favorites={favorites}
      />
    </div>
  );
};

export default page;

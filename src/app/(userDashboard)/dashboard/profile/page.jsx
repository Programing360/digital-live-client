import React from "react";
import ProfileView from "./ProfileView";
import { getUseSession } from "@/lib/core/session";
import { allLessons, getLessonById } from "@/lib/api/lessons";

const ProfilePage = async () => {
  const user = await getUseSession();
  const userPublishLesson = await getLessonById(user.id);
  const allLesson = await allLessons();

  const userFavorites = allLesson.filter((lesson) =>
    lesson.favorites.includes(user.id),
  );
  // console.log(userFavorites);

  return (
    <div>
      <ProfileView
        user={user}
        userPublishLesson={userPublishLesson}
        userFavorites={userFavorites}
      ></ProfileView>
    </div>
  );
};

export default ProfilePage;

import React from "react";
import MyFavorites from "./MyFavorites";
import { getUseSession } from "@/lib/core/session";
import { favoriteDataById } from "@/lib/api/favorite";
export const metadata = {
  title: 'My-Favorites | Digital Life Lessons'
}
const MyFavoritesPage = async () => {
  const user = await getUseSession();

  const favorites = await favoriteDataById(user?.id);
  console.log(favorites);
  return (
    <div>
      <MyFavorites favorites={favorites} />
    </div>
  );
};

export default MyFavoritesPage;

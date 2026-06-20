import React from "react";
import MyFavorites from "./MyFavorites";
import { getUseSession } from "@/lib/core/session";
import { favoriteDataById } from "@/lib/api/favorite";

const MyFavoritesPage = async () => {
  const user = await getUseSession();

  const favorites = await favoriteDataById(user?.id);

  return (
    <div>
      <MyFavorites favorites={favorites} />
    </div>
  );
};

export default MyFavoritesPage;

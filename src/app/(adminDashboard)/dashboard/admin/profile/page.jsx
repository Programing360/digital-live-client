import React from "react";
import AdminProfilePage from "./Profile";
import { getUseSession } from "@/lib/core/session";
export const metadata = {
  title: "Admin-Profile | Digital Life Lessons",
};
const profilePage = async() => {
  const user = await getUseSession();

  return (
    <div>
      <AdminProfilePage user={user}></AdminProfilePage>
    </div>
  );
};

export default profilePage;

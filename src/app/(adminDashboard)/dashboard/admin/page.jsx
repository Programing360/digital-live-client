import AdminDashboardHome from "@/component/adminDashboard/AdminDashboardHome";
import { allLessons, newLesson } from "@/lib/api/lessons";
import { getAllUser } from "@/lib/api/user";
import React from "react";

const AdminPage = async () => {
  const allLesson = await allLessons();
  const userCount = await getAllUser();
  const newLessons = await newLesson();
  console.log(newLessons);
  return (
    <div>
      <AdminDashboardHome
        allLesson={allLesson}
        userCount={userCount}
        newLessons={newLessons}
      ></AdminDashboardHome>
    </div>
  );
};

export default AdminPage;

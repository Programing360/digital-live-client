import AdminDashboardHome from "@/component/adminDashboard/AdminDashboardHome";
import { getGrowthData } from "@/lib/api/growth";
import { allLessons, newLesson } from "@/lib/api/lessons";
import { getReport } from "@/lib/api/report";
import { getAllUser } from "@/lib/api/user";
import React from "react";

const AdminPage = async () => {
  const allLesson = await allLessons();
  const userCount = await getAllUser();
  const newLessons = await newLesson();
  const allReport = await getReport();
  const allGrowth = await getGrowthData()
// console.log(allGrowth);

  return (
    <div>
      <AdminDashboardHome
        allLesson={allLesson}
        userCount={userCount}
        newLessons={newLessons}
        allReport={allReport}
        allGrowth={allGrowth}
      ></AdminDashboardHome>
    </div>
  );
};

export default AdminPage;

import AdminDashboardHome from "@/component/adminDashboard/AdminDashboardHome";
import { getGrowthData } from "@/lib/api/growth";
import { allLessons, newLesson } from "@/lib/api/lessons";
import { getReport } from "@/lib/api/report";
import { getAllUser } from "@/lib/api/user";
import React from "react";
export const dynamic = "force-dynamic";

const AdminPage = async () => {
  const allLessonData = await allLessons();
  const userCount = await getAllUser();
  const newLessonCount =await newLesson()
  const allReport = await getReport();
  const allGrowth = await getGrowthData()

  return (
    <div>
      <AdminDashboardHome
        allLesson={allLessonData}
        userCount={userCount}
        newLessons={newLessonCount.count}
        allReport={allReport}
        allGrowth={allGrowth}
      ></AdminDashboardHome>
    </div>
  );
};

export default AdminPage;

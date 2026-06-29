import AdminDashboardHome from "@/component/adminDashboard/AdminDashboardHome";
import { getGrowthData } from "@/lib/api/growth";
import { allLessons, newLesson } from "@/lib/api/lessons";
import { getReport } from "@/lib/api/report";
import { getTopContributors } from "@/lib/api/top_contributors";
import { getAllUser } from "@/lib/api/user";
import React from "react";
export const dynamic = "force-dynamic";
export const metadata = {
  title: 'Admin | Digital Life Lessons'
}
const AdminPage = async () => {
  const allLessonData = await allLessons();
  const userCount = await getAllUser();
  const newLessonCount =await newLesson()
  const allReport = await getReport();
  const allGrowth = await getGrowthData()
  const topContributors = await getTopContributors();
  return (
    <div className="">
      <AdminDashboardHome
        allLesson={allLessonData}
        userCount={userCount}
        newLessons={newLessonCount.count}
        allReport={allReport}
        allGrowth={allGrowth}
        topContributors={topContributors}
      ></AdminDashboardHome>
    </div>
  );
};

export default AdminPage;

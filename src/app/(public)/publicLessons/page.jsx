import React from "react";
import LessonsFeed from "@/component/LessonsFeed";
import { allLessons } from "@/lib/api/lessons";
import { getUseSession } from "@/lib/core/session";
import { favoriteDataById } from "@/lib/api/favorite";

const page = async () => {
  const user = await getUseSession();
  const lessonsData = await allLessons();
  const favorites = await favoriteDataById(user?.id);

  const currentUserPlan = user?.isPlan === "premium" ? "Premium" : "Free";

  return (
    // ইমেজের সাথে সামঞ্জস্য রেখে পুরো পেজের ব্যাকগ্রাউন্ডকে ডার্ক মোডে গভীর বেগুনি (Deep Violet) দেওয়া হয়েছে
    <div className="min-h-screen bg-transparent dark:bg-[#12032e] transition-colors duration-500">
      <div className="container mx-auto">
        <LessonsFeed
          initialLessons={lessonsData}
          userPlan={currentUserPlan} // প্রপস নাম ফিক্স করা হয়েছে (isUserPremium পরিবর্তন করে userPlan করা হলো)
          favorites={favorites}
        />
      </div>
    </div>
  );
};

export default page;
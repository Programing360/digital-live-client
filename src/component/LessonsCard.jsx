"use client";

import React from "react";
import Link from "next/link";
import { Card, CardFooter, Avatar, Button, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import { Lock, Calendar, Heart, Bookmark, Eye, Sparkles } from "lucide-react";
import Image from "next/image";
import { createFavoritesLesson } from "@/lib/action/favorites";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { lessonLikes } from "@/lib/api/lessons";
import { useRouter } from "next/navigation";

// UI/UX থিম অনুযায়ী কালার ডাইনামিক্স ম্যাপিং (ইমেজের ভাইব্রেন্ট স্টাইল অনুসরণ করে)
const toneColorMap = {
  Motivational: "bg-blue-500 shadow-md shadow-blue-500/20",
  Grateful: "bg-[#00e5b4] shadow-md shadow-[#00e5b4]/20",
  Peaceful: "bg-purple-400 shadow-md shadow-purple-400/20",
  Sad: "bg-orange-400 shadow-md shadow-orange-400/20",
  Happy: "bg-yellow-400 shadow-md shadow-yellow-400/20",
  Neutral: "bg-slate-400 shadow-md shadow-slate-400/20",
};

export default function LessonCard({ lesson }) {
  const {
    _id,
    title,
    description,
    category,
    emotionalTone,
    access,
    createdAt,
    author,
    imageUrl,
    likesCount = 0,
    likes = [],
    favorites = [],
    favoritesCount = 0,
  } = lesson;

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const isLike = likes?.includes(user?.id);
  const isFavorites = favorites?.includes(user?.id);

  const handleFavorites = async (e) => {
    e.preventDefault(); // প্যারেন্ট কার্ড নেভিগেশন প্রটেক্ট করতে
    if (!user) return toast.warn("Please login to save favorites!");

    const newFavorites = {
      userId: user?.id,
      userName: user?.name,
      lessonId: _id,
    };

    const data = await createFavoritesLesson(newFavorites);
    if (data?.message) {
      toast.success(data.message);
      router.refresh();
    }
  };

  const handleLikeBtn = async (e) => {
    e.preventDefault();
    if (!user) return toast.warn("Please login to like this lesson");

    const newLikes = {
      lessonId: _id,
      userId: user?.id,
    };

    const likeCount = await lessonLikes(newLikes);
    if (likeCount) {
      toast.success(likeCount.message);
      router.refresh();
    }
  };

  const isLoggedIn = !!user;
  const isPremiumUser = user?.isPlan?.toLowerCase() === "premium";
  const isPremiumLesson = access?.toLowerCase() === "premium";
  const canAccess = !isPremiumLesson || isPremiumUser;
  const isLocked = !canAccess;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={!isLocked ? { y: -6 } : {}}
      className="w-full flex h-full group"
    >
      <Card className="w-full relative overflow-hidden bg-white dark:bg-[#1a093c]/50 border border-slate-200/60 dark:border-white/[0.06] backdrop-blur-xl rounded-[28px] shadow-sm hover:shadow-xl hover:border-indigo-500/20 dark:hover:border-[#00e5b4]/30 transition-all duration-300 flex flex-col justify-between">
        
        {/* UPPER CARD AREA: PREMIUM IMAGE METRICS CONTAINER */}
        <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100 dark:bg-[#12032e]">
          <Image
            src={imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`object-cover transition-transform duration-700 ease-out ${
              !isLocked ? "group-hover:scale-105" : ""
            }`}
          />

          {/* Floating Badges */}
          <div className="absolute inset-x-4 top-4 z-10 flex items-center justify-between pointer-events-none">
            <Chip
              size="sm"
              className="bg-slate-900/60 backdrop-blur-md text-white font-bold text-[10px] border border-white/[0.08] tracking-wide uppercase px-2.5 h-6 rounded-lg"
            >
              {category || "General"}
            </Chip>

            <Chip
              size="sm"
              className={`font-black text-[10px] uppercase tracking-wider px-2.5 h-6 rounded-lg border ${
                isPremiumLesson
                  ? "bg-amber-500/20 text-amber-400 border-amber-500/30 backdrop-blur-md"
                  : "bg-white/10 text-white border-white/10 backdrop-blur-md"
              }`}
            >
              {access}
            </Chip>
          </div>

          {/* PREMIUM LOCK OVERLAY (গ্লাস মরফিজম গ্লো ইফেক্ট) */}
          {isLocked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-20 bg-[#12032e]/85 backdrop-blur-md flex flex-col items-center justify-center p-5 text-center"
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="p-3 bg-white/[0.04] border border-white/[0.08] rounded-full mb-2.5 text-[#00e5b4] shadow-xl shadow-[#00e5b4]/5"
              >
                <Lock size={20} strokeWidth={2.5} />
              </motion.div>

              <h4 className="text-white font-black text-sm tracking-tight">
                {!isLoggedIn ? "Access Restricted" : "Premium Content"}
              </h4>
              <p className="text-purple-200/50 text-[11px] mt-1 mb-4 max-w-[200px] leading-normal font-medium">
                {!isLoggedIn ? "Sign in to unlock this learning channel module." : "Upgrade plan to unlock this asset block."}
              </p>

              <Link href={!isLoggedIn ? "/auth/login" : "/upgrade"} className="w-full max-w-[130px]">
                <Button
                  size="sm"
                  className="w-full bg-[#00e5b4] text-slate-950 font-black text-xs rounded-xl shadow-md shadow-[#00e5b4]/20 hover:opacity-90 transition-all"
                >
                  {!isLoggedIn ? "Login Now" : "Unlock Module"}
                </Button>
              </Link>
            </motion.div>
          )}
        </div>

        {/* CARD CONTENT BODY */}
        <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${toneColorMap[emotionalTone] || "bg-neutral-400"}`} />
              <span className="text-[10px] text-slate-400 dark:text-purple-300/40 font-black uppercase tracking-widest">
                {emotionalTone} Perspective
              </span>
            </div>

            <h3 className="font-black text-sm md:text-base text-slate-800 dark:text-white tracking-tight line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-[#00e5b4] transition-colors duration-200">
              {title}
            </h3>

            <p className="text-slate-500 dark:text-purple-200/50 text-xs leading-relaxed line-clamp-2 font-medium">
              {description}
            </p>
          </div>

          {/* Published Meta Timestamp */}
          <div className="flex items-center gap-1.5 text-slate-400 dark:text-purple-300/30 text-[10px] font-bold uppercase tracking-wider">
            <Calendar size={12} className="opacity-60" />
            <span>Published {createdAt || "Recent"}</span>
          </div>
        </div>

        {/* FOOTER ACTION INTERACTIONS */}
        <CardFooter className="flex flex-col gap-3 border-t border-slate-100 dark:border-white/[0.05] bg-slate-50/50 dark:bg-white/[0.01] p-4 rounded-b-[28px]">
          <div className="flex items-center justify-between w-full">
            
            {/* Author Identification */}
            <div className="flex items-center gap-2 max-w-[60%]">
              <Avatar size="sm" src={author?.image || "https://i.pravatar.cc/150"} className="w-6 h-6 border dark:border-white/10" />
              <span className="text-xs font-bold text-slate-700 dark:text-purple-200/80 truncate">
                {author?.name || "Anonymous Creator"}
              </span>
            </div>

            {/* Micro Interaction Core Icons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleLikeBtn}
                className="flex items-center gap-1 group/btn hover:scale-105 active:scale-95 transition-all"
              >
                <Heart
                  size={15}
                  fill={isLike ? "currentColor" : "none"}
                  className={`transition-colors duration-200 ${
                    isLike ? "text-red-500" : "text-slate-400 dark:text-purple-300/40 group-hover/btn:text-red-500"
                  }`}
                />
                <span className="font-bold text-[11px] text-slate-600 dark:text-purple-300/50">{likesCount}</span>
              </button>

              <button
                onClick={handleFavorites}
                className="flex items-center gap-1 group/btn hover:scale-105 active:scale-95 transition-all"
              >
                <Bookmark
                  size={15}
                  fill={isFavorites ? "currentColor" : "none"}
                  className={`transition-colors duration-200 ${
                    isFavorites ? "text-[#00e5b4]" : "text-slate-400 dark:text-purple-300/40 group-hover/btn:text-[#00e5b4]"
                  }`}
                />
                <span className="font-bold text-[11px] text-slate-600 dark:text-purple-300/50">{favoritesCount}</span>
              </button>
            </div>
          </div>

          {/* Action Trigger Block Button */}
          <div className="w-full pt-0.5">
            {isLocked ? (
              <Link href={!isLoggedIn ? "/auth/login" : "/upgrade"} className="w-full block">
                <Button
                  size="sm"
                  className="w-full font-black text-xs h-9 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20"
                >
                  {!isLoggedIn ? "Login to Premium" : "Upgrade Subscription"}
                </Button>
              </Link>
            ) : (
              <Link href={`/publicLessons/${_id}`} className="w-full block">
                <Button
                  size="sm"
                  variant="flat"
                  className="w-full font-black text-xs h-9 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-white/[0.04] dark:text-[#00e5b4] dark:hover:bg-white/[0.08]"
                  endContent={<Eye size={13} />}
                >
                  See Details
                </Button>
              </Link>
            )}
          </div>
        </CardFooter>

      </Card>
    </motion.div>
  );
}
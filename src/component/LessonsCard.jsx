"use client";

import React from "react";
import Link from "next/link";
import { Card, CardFooter, Avatar, Button, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import { Lock, Calendar, Heart, Bookmark, Eye } from "lucide-react";
import Image from "next/image";
import { createFavoritesLesson } from "@/lib/action/favorites";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { lessonLikes } from "@/lib/api/lessons";
import { useRouter } from "next/navigation";

// আপনার ডার্ক গ্লো থিমের সাথে সামঞ্জস্য রেখে ইমোশনাল টোন কালার প্যালেট
const toneColorMap = {
  Motivational: "bg-blue-500 shadow-sm shadow-blue-500/50",
  Grateful: "bg-[#00e5b4] shadow-sm shadow-[#00e5b4]/50", // Neon Teal
  Peaceful: "bg-purple-400 shadow-sm shadow-purple-400/50",
  Sad: "bg-orange-400 shadow-sm shadow-orange-400/50",
  Happy: "bg-yellow-400 shadow-sm shadow-yellow-400/50",
  Neutral: "bg-slate-400 shadow-sm shadow-slate-400/50",
};

export default function LessonCard({ lesson, userPlan = "Free" }) {
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
    favoritesCount,
  } = lesson;

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const isLike = likes?.includes(user?.id);
  const isFavorites = favorites.includes(user?.id);

  const handleFavorites = async () => {
    const newFavorites = {
      userId: user?.id,
      userName: user?.name,
      lessonId: _id,
    };
    if (!user) {
      return toast.warn("Please login to favorites!");
    }
    const data = await createFavoritesLesson(newFavorites);

    if (data.message) {
      toast.success(`${data.message}`);
      router.refresh();
    }
  };

  const handleLikeBtn = async (id) => {
    if (!user) {
      return toast.warn("Please login to like");
    }
    const newLikes = {
      lessonId: id,
      userId: user?.id,
    };

    const likeCount = await lessonLikes(newLikes);
    router.refresh();
    if (likeCount.message) {
      toast.success(`${likeCount.message}`);
    }
  };

  const isLoggedIn = !!user;
  const isPremiumUser = user?.isPlan?.toLowerCase() === "premium";
  const isPremiumLesson = access?.toLowerCase() === "premium";
  const canAccess = !isPremiumLesson || isPremiumUser;
  const isLocked = !canAccess;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={!isLocked ? { y: -6, transition: { duration: 0.2 } } : {}}
      className="w-full h-full flex"
    >
      {/* কার্ড ব্যাকগ্রাউন্ড থিমিং - সাইবার গ্লো শেড */}
      <Card className="w-full relative overflow-hidden bg-white dark:bg-[#1a093c]/60 border border-slate-100 dark:border-white/[0.06] backdrop-blur-md rounded-[24px] shadow-sm hover:shadow-xl dark:hover:shadow-purple-950/20 transition-all duration-300 flex flex-col justify-between">
        {/* Upper Card Area: Image section */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-[#12032e]">
          <Image
            src={
              imageUrl ||
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            }
            alt={title}
            width={400}
            height={300}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              !isLocked ? "hover:scale-105" : ""
            }`}
          />

          {/* Floating Category Badge */}
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <Chip
              size="sm"
              className="bg-black/50 backdrop-blur-md text-white font-bold text-[11px] border border-white/10 capitalize px-2.5 py-1"
            >
              {category}
            </Chip>
          </div>

          {/* Floating Access Status Badge */}
          <div className="absolute top-4 right-4 z-10">
            <Chip
              size="sm"
              color={isPremiumLesson ? "warning" : "default"}
              variant="solid"
              className={`font-black text-[10px] uppercase tracking-wider px-2.5 ${
                isPremiumLesson
                  ? "bg-amber-500 text-slate-950"
                  : "bg-white/20 backdrop-blur-sm text-white"
              }`}
            >
              {access}
            </Chip>
          </div>

          {/* OPAQUE PREMIUM LOCK OVERLAY LAYER */}
          {isLocked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-20 bg-[#12032e]/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
                className="p-3.5 bg-white/10 border border-white/20 rounded-full mb-3 text-[#00e5b4] shadow-lg shadow-[#00e5b4]/10"
              >
                <Lock size={24} strokeWidth={2.5} />
              </motion.div>

              <h4 className="text-white font-black text-sm tracking-wide">
                {!isLoggedIn ? "Login Required" : "Premium Content"}
              </h4>

              <p className="text-purple-200/60 text-[11px] mt-1 mb-4 max-w-[180px]">
                {!isLoggedIn
                  ? "Please login to view this lesson."
                  : "Upgrade to Premium to unlock everything."}
              </p>

              <Link
                href={!isLoggedIn ? "/auth/login" : "/upgrade"}
                className="w-full max-w-[150px]"
              >
                <Button
                  size="sm"
                  radius="xl"
                  className="w-full bg-[#00e5b4] text-slate-950 font-black text-xs shadow-md shadow-[#00e5b4]/20 hover:opacity-90"
                >
                  {!isLoggedIn ? "Login Now" : "Unlock Now"}
                </Button>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`w-2 h-2 rounded-full ${toneColorMap[emotionalTone] || "bg-neutral-400"}`}
              />
              <span className="text-[10px] text-default-400 dark:text-purple-300/50 font-bold uppercase tracking-widest">
                {emotionalTone} Tone
              </span>
            </div>

            <h3 className="font-bold text-base text-slate-800 dark:text-purple-50 tracking-tight line-clamp-2 leading-snug hover:text-indigo-600 dark:hover:text-[#00e5b4] transition-colors">
              {title}
            </h3>

            <p className="text-default-500 dark:text-purple-200/40 text-xs mt-2 leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>

          {/* Creation Date Badge */}
          <div className="flex items-center gap-1.5 text-default-400 dark:text-purple-300/30 mt-4 text-[11px] font-medium">
            <Calendar size={12} className="opacity-70" />
            <span>Published {createdAt}</span>
          </div>
        </div>

        {/* Footer Interaction Elements */}
        <CardFooter className="flex flex-col gap-3 border-t border-slate-100 dark:border-white/[0.04] bg-slate-50/40 dark:bg-white/[0.01] p-4">
          <div className="flex items-center justify-between w-full">
            {/* Author Meta Profile */}
            <div className="flex items-center gap-2 max-w-[55%]">
              <Avatar className="w-6 h-6 border border-purple-500/20">
                <Avatar.Image
                  src={author?.image || "https://i.pravatar.cc/150"}
                  name={author?.name || ""}
                  className="object-cover"
                />
              </Avatar>
              <span className="text-xs font-bold text-slate-700 dark:text-purple-200/70 truncate">
                {author?.name || "Anonymous"}
              </span>
            </div>

            {/* Interaction Action Metrics Counter */}
            <div className="flex items-center gap-3">
              {/* Like Component Option */}
              <button
                onClick={() => handleLikeBtn(_id)}
                className="flex items-center gap-1 text-default-400 dark:text-purple-300/40 hover:scale-105 active:scale-95 transition-all"
              >
                <Heart
                  size={15}
                  fill={isLike ? "currentColor" : "none"}
                  className={`transition-colors duration-200 ${
                    isLike
                      ? "text-red-500 dark:text-red-400"
                      : "hover:text-red-500"
                  }`}
                />
                <span className="font-bold text-[11px] text-slate-600 dark:text-purple-300/50">
                  {likesCount}
                </span>
              </button>

              {/* Bookmark Component Option */}
              <button
                onClick={handleFavorites}
                className="flex items-center gap-1 text-default-400 dark:text-purple-300/40 hover:scale-105 active:scale-95 transition-all"
              >
                <Bookmark
                  size={15}
                  fill={isFavorites ? "currentColor" : "none"}
                  className={`transition-colors duration-200 ${
                    isFavorites
                      ? "text-violet-600 dark:text-[#00e5b4]"
                      : "hover:text-violet-500 dark:hover:text-[#00e5b4]"
                  }`}
                />
                <span className="font-bold text-[11px] text-slate-600 dark:text-purple-300/50">
                  {favoritesCount}
                </span>
              </button>
            </div>
          </div>

          {/* Details Trigger Redirection Navigation Button */}
          <div className="w-full">
            {isLocked ? (
              <Link
                href={!isLoggedIn ? "/auth/login" : "/upgrade"}
                className="w-full block"
              >
                <Button
                  size="sm"
                  radius="xl"
                  className="w-full font-black text-xs bg-amber-500 text-slate-950"
                >
                  {!isLoggedIn ? "Login to Continue" : "Upgrade to Premium"}
                </Button>
              </Link>
            ) : (
              <Link href={`/publicLessons/${_id}`} className="w-full block">
                <Button
                  size="sm"
                  radius="xl"
                  variant="flat"
                  className="w-full font-black text-xs bg-violet-100 text-violet-600 dark:bg-white/[0.04] dark:text-[#00e5b4] dark:hover:bg-white/[0.08]"
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

"use client";

import React, { useState, useEffect } from "react";
import { createFavoritesLesson } from "@/lib/action/favorites";
import { lessonLikes } from "@/lib/api/lessons";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Bookmark, Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SectionStarIcon = () => (
  <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-[#00e5b4] shadow-sm transition-colors">
    <Star className="w-4 h-4 fill-current" />
  </div>
);

export default function FeaturedLifeLessons({ allFeatured, user }) {
  const router = useRouter();

  const [lessons, setLessons] = useState(allFeatured);

  useEffect(() => {
    setLessons(allFeatured);
  }, [allFeatured]);

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const gridContainerVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  const handleFavorites = async (lessonId) => {
    if (!user) {
      return toast.warn("Please login to favorites!");
    }

    const userId = user.id;

    const previousLessons = [...lessons];

    setLessons((prev) =>
      prev.map((l) => {
        if (l._id === lessonId) {
          const hasFav = l.favorites?.includes(userId);
          return {
            ...l,
            favorites: hasFav
              ? l.favorites.filter((id) => id !== userId)
              : [...(l.favorites || []), userId],
            favoritesCount: hasFav
              ? Math.max(0, (l.favoritesCount || 1) - 1)
              : (l.favoritesCount || 0) + 1,
          };
        }
        return l;
      }),
    );

    try {
      const newFavorites = { userId, userName: user?.name, lessonId };
      const data = await createFavoritesLesson(newFavorites);
      if (data.message) {
        toast.success(`${data.message}`);
        router.refresh();
      }
    } catch (error) {
      setLessons(previousLessons);
      toast.error("Something went wrong with favorites!");
    }
  };

  const handleLikeBtn = async (lessonId) => {
    if (!user) {
      return toast.warn("Please login to like");
    }

    const userId = user.id;
    const previousLessons = [...lessons];

    setLessons((prev) =>
      prev.map((l) => {
        if (l._id === lessonId) {
          const hasLiked = l.likes?.includes(userId);
          return {
            ...l,
            likes: hasLiked
              ? l.likes.filter((id) => id !== userId)
              : [...(l.likes || []), userId],
            likesCount: hasLiked
              ? Math.max(0, (l.likesCount || 1) - 1)
              : (l.likesCount || 0) + 1,
          };
        }
        return l;
      }),
    );

    try {
      const newLikes = { lessonId, userId };
      const likeCount = await lessonLikes(newLikes);

      if (likeCount.message) {
        toast.success(`${likeCount.message}`);
      }
      router.refresh();
    } catch (error) {
      setLessons(previousLessons);
      toast.error("Failed to update like. Please try again.");
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gradient-to-b dark:from-[#12032e] dark:to-[#1a093c]/90 overflow-hidden select-none transition-colors duration-500 rounded-b-2xl">
      {/* Header Section */}
      <motion.div
        variants={fadeInUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"
      >
        <div className="flex items-center gap-3">
          <SectionStarIcon />
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Featured Life Lessons
            </h2>
            <p className="text-sm font-medium text-slate-500 dark:text-purple-300/40 mt-0.5">
              Handpicked lessons from our amazing community
            </p>
          </div>
        </div>

        <Link href={"/publicLessons"}>
          <Button
            variant="bordered"
            className="border-purple-200 dark:border-white/[0.08] shadow-sm text-purple-600 dark:text-[#00e5b4] font-bold hover:bg-purple-50/50 dark:hover:bg-white/[0.02] transition-all px-5 h-9 active:scale-95 radius-xl"
          >
            View All
          </Button>
        </Link>
      </motion.div>

      {/* Grid Container */}
      <motion.div
        variants={gridContainerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-8px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {lessons.map((lesson) => (
          <motion.div
            key={lesson._id}
            variants={cardVariant}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="flex flex-col bg-white dark:bg-[#1a093c]/60 border border-slate-100 dark:border-white/[0.06] backdrop-blur-md rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-purple-950/10 transition-all duration-300 group cursor-pointer"
          >
            {/* Image Wrap */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50 dark:bg-[#12032e]">
              <Image
                src={lesson.imageUrl}
                alt={lesson.title}
                width={400}
                height={250}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 text-[11px] font-bold px-3 py-1 bg-black/40 dark:bg-black/50 backdrop-blur-md text-white border border-white/10 rounded-full shadow-sm select-none">
                {lesson.category}
              </span>
            </div>

            {/* Content Area */}

            <Link href={`publicLessons/${lesson._id}`}>
              <div className="flex flex-col flex-1 p-5">
                <h3 className="text-base font-bold text-slate-900 dark:text-purple-50 leading-snug min-h-[44px] group-hover:text-indigo-600 dark:group-hover:text-[#00e5b4] transition-colors duration-200">
                  {lesson.title}
                </h3>
                <p className="text-xs font-medium text-slate-500 dark:text-purple-200/40 leading-relaxed mt-1.5 flex-1 line-clamp-2">
                  {lesson.description}
                </p>

                {/* Card Footer */}
                <div className="flex items-center justify-between mt-6 pt-3 border-t border-slate-100/60 dark:border-white/[0.04]">
                  <div className="flex items-center gap-2">
                    <Image
                      src={lesson.author?.image || "https://i.pravatar.cc/150"}
                      alt={lesson.author?.name}
                      width={400}
                      height={400}
                      className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-100 dark:ring-white/[0.08]"
                    />
                  </div>

                  <span className="text-xs font-bold text-slate-700 dark:text-purple-200/70">
                    {lesson.author?.name}
                  </span>

                  <div className="flex items-center gap-4 font-bold text-[11px]">
                    <div className="flex items-center gap-3">
                      {/* Like Button */}
                      <button
                        onClick={() => handleLikeBtn(lesson._id)}
                        className="flex items-center gap-1 text-default-400 dark:text-purple-300/40 hover:scale-105 active:scale-95 transition-all"
                      >
                        <Heart
                          size={15}
                          fill={
                            lesson.likes?.includes(user?.id)
                              ? "currentColor"
                              : "none"
                          }
                          className={`transition-colors duration-200 ${
                            lesson.likes?.includes(user?.id)
                              ? "text-red-500 dark:text-red-400"
                              : "text-slate-400 dark:text-purple-300/40 hover:text-red-500"
                          }`}
                        />
                        <span className="font-bold text-[11px] text-slate-600 dark:text-purple-300/50">
                          {lesson.likesCount}
                        </span>
                      </button>

                      {/* Bookmark Button */}
                      <button
                        onClick={() => handleFavorites(lesson._id)}
                        className="flex items-center gap-1 text-default-400 dark:text-purple-300/40 hover:scale-105 active:scale-95 transition-all"
                      >
                        <Bookmark
                          size={15}
                          fill={
                            lesson.favorites?.includes(user?.id)
                              ? "currentColor"
                              : "none"
                          }
                          className={`transition-colors duration-200 ${
                            lesson.favorites?.includes(user?.id)
                              ? "text-violet-600 dark:text-[#00e5b4]"
                              : "text-slate-400 dark:text-purple-300/40 hover:text-violet-500 dark:hover:text-[#00e5b4]"
                          }`}
                        />
                        <span className="font-bold text-[11px] text-slate-600 dark:text-purple-300/50">
                          {lesson.favoritesCount}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

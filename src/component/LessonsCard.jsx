"use client";

import React from "react";
import Link from "next/link";
import { Card, CardFooter, Avatar, Button, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import { Lock, Calendar, Heart, Bookmark, Eye } from "lucide-react";
import Image from "next/image";
import { createFavoritesLesson } from "@/lib/action/favorites";
import { toast } from "react-toastify";

// Color mapping system for Emotional Tones as shown on the left sidebar of image_e3125c.jpg
const toneColorMap = {
  Motivational: "bg-blue-500",
  Grateful: "bg-emerald-500",
  Peaceful: "bg-amber-500",
  Sad: "bg-orange-500",
  Happy: "bg-yellow-500",
  Neutral: "bg-neutral-400",
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
    bookmarks = 0,
    // creator = { name: "Anonymous", image: "" },
  } = lesson;
  // console.log(lesson);
  // const [favorites, setFavorites] = useState(0);
  // console.log(favorites);
  // useEffect(() => {
  //   favoritesCounts(favorites);
  // }, [favorites]);

  const handleFavorites = async () => {
    const newFavorites = {
      userId: author?.authorId,
      lessonId: _id,
    };

    // console.log(newFavorites, author);

    const data = await createFavoritesLesson(newFavorites);

    if (data.insertedId) {
      toast.success("Saved Favorite Lesson❤️");
    }
  };

  // Premium lock condition validation logic
  const isLocked =
    access?.toLowerCase() === "premium" && userPlan !== "Premium";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={!isLocked ? { y: -8, scale: 1.01 } : {}}
      className="w-full h-full flex "
    >
      <Card className="w-full relative overflow-hidden bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-[24px] shadow-sm hover:shadow-xl transition-shadow duration-300 flex-col justify-between">
        {/* Upper Card Area: Cover Image & Floating Category Badge */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-zinc-800 ">
          <Image
            src={
              imageUrl ||
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            }
            alt={title}
            width={40}
            height={40}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isLocked ? "" : "hover:scale-105"
            }`}
          />

          {/* Top Floating Utility Elements */}
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <Chip
              size="sm"
              className="bg-black/40 backdrop-blur-md text-white font-semibold text-xs border border-white/10 capitalize px-2.5 py-1"
            >
              {category}
            </Chip>
          </div>

          <div className="absolute top-4 right-4 z-10">
            <Chip
              size="sm"
              color={
                access?.toLowerCase() === "premium" ? "warning" : "default"
              }
              variant="solid"
              className="font-bold text-[10px] uppercase tracking-wider px-2"
            >
              {access}
            </Chip>
          </div>

          {/* ⭐ OPAQUE PREMIUM LOCK OVERLAY LAYER ⭐ */}
          {isLocked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-20 bg-black/45 backdrop-blur-lg flex flex-col items-center justify-center p-6 text-center"
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                className="p-4 bg-white/15 backdrop-blur-md border border-white/20 rounded-full mb-3 text-white shadow-lg"
              >
                <Lock size={28} strokeWidth={2.5} />
              </motion.div>
              <h4 className="text-white font-extrabold text-base tracking-tight px-2">
                Premium Lesson
              </h4>
              <p className="text-white/80 text-xs mt-1 mb-5 max-w-[200px] leading-relaxed">
                Upgrade to view and unlock this shared wisdom.
              </p>
              <Link href="/upgrade" className="w-full px-4 max-w-[190px]">
                <Button
                  size="sm"
                  radius="full"
                  className="w-full bg-white text-slate-900 font-bold text-xs shadow-md border border-white hover:bg-slate-50 active:scale-95 transition-all"
                >
                  Upgrade to Premium
                </Button>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Card Context Body Items */}
        <div className="p-5 flex-grow flex flex-col justify-between">
          <div>
            {/* Title & Tone Metadata */}
            <div className="flex items-center gap-2 mb-2.5">
              <span
                className={`w-2.5 h-2.5 rounded-full ${toneColorMap[emotionalTone] || "bg-neutral-400"}`}
              />
              <span className="text-[11px] text-default-400 font-bold uppercase tracking-wider">
                {emotionalTone} Tone
              </span>
            </div>

            <h3 className="font-bold text-lg text-slate-800 dark:text-zinc-100 tracking-tight line-clamp-2 leading-snug">
              {title}
            </h3>

            <p className="text-default-500 dark:text-zinc-400 text-xs mt-2 leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>

          {/* Creation Date Badge Metadata */}
          <div className="flex items-center gap-1.5 text-default-400 mt-4 text-[11px] font-medium">
            <Calendar size={13} />
            <span>Published {createdAt}</span>
          </div>
        </div>

        {/* Footer Area: User Identity Profiles & Metrics Interaction Bar */}
        <CardFooter className="flex flex-col border-t  border-slate-100 dark:border-zinc-800/60  bg-slate-50/40 dark:bg-zinc-900/20">
          <div className="flex items-center justify-between gap-2 px-5 pb-2 pt-2 ">
            <div className="flex items-center gap-2 max-w-[50%] ">
              <Avatar>
                <Avatar.Image
                  size="sm"
                  src={author?.image || "https://i.pravatar.cc/150"}
                  name={author?.name || ""}
                  className="w-full border border-default-200"
                />
              </Avatar>
              <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300 truncate">
                {author?.name}
              </span>
            </div>

            {/* Engagement Counts or Nav Action Trigger */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-default-400 text-xs">
                <Heart
                  size={13}
                  className="hover:text-rose-500 transition-colors cursor-pointer "
                />

                <span className="font-medium text-[11px]">0</span>
              </div>
              <div className="flex items-center gap-1 text-default-400 text-xs">
                <Bookmark
                  onClick={handleFavorites}
                  size={13}
                  className="hover:text-violet-500 transition-colors cursor-pointer"
                />
                <span className="font-medium text-[11px]">{bookmarks}</span>
              </div>
            </div>
          </div>
          <div className="w-full ">
            {!!isLocked ? (
              <Button
                size="sm"
                radius="full"
                variant="flat"
                isDisabled={true}
                color="secondary"
                className={
                  !isLocked
                    ? "font-bold text-xs px-3 h-8  border w-full bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400 shadow-md disabled:opacity-50"
                    : "font-bold text-xs px-3 h-8  border w-full bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400 shadow-md"
                }
                endContent={<Eye size={13} />}
              >
                See Details
              </Button>
            ) : (
              <Link href={`/publicLessons/${_id}`}>
                <Button
                  size="sm"
                  radius="full"
                  variant="flat"
                  color="secondary"
                  className={
                    !isLocked
                      ? "font-bold text-xs px-3 h-8  border w-full bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400 shadow-md disabled:opacity-50"
                      : "font-bold text-xs px-3 h-8  border w-full bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400 shadow-md"
                  }
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

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Eye,
  Heart,
  Bookmark,
  User,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { Button, Avatar, Card, CardBody, TextArea } from "@heroui/react";
import { toast } from "react-toastify";

import { lessonLikes } from "@/lib/api/lessons";
import { createFavoritesLesson } from "@/lib/action/favorites";
import { userComment } from "@/lib/api/comment";
import ReportLessonButton from "./ReportLessonButton";

export default function LessonDetails({
  lessonData,
  user = null,
  total = [],
  allLessons = [],
  getUserComment,
}) {
  const {
    _id,
    title,
    description,
    category,
    emotionalTone,
    imageUrl,
    access,
    author,
    visibility,
    createAt,
    updatedAt,
    likes = [],
    likesCount = 0,
    favorites = [],
    favoritesCount = 0,
  } = lessonData;

  const views = 100;
  const readingTime = Math.ceil((description?.split(" ").length || 0) / 200);
  const router = useRouter();

  // স্টেটস
  const [commentValue, setCommentValue] = useState("");
  const [localLikes, setLocalLikes] = useState(likes);
  const [localLikesCount, setLocalLikesCount] = useState(likesCount);
  const [localFavs, setLocalFavs] = useState(favorites);
  const [localFavsCount, setLocalFavsCount] = useState(favoritesCount);

  // সিঙ্ক স্টেটস যখন প্রপস চেঞ্জ হয়
  useEffect(() => {
    setLocalLikes(likes);
    setLocalLikesCount(likesCount);
    setLocalFavs(favorites);
    setLocalFavsCount(favoritesCount);
  }, [likes, likesCount, favorites, favoritesCount]);

  const isLike = localLikes.includes(user?.id);
  const isFav = localFavs.includes(user?.id);

  // ১. অপ্টিমিস্টিক লাইক হ্যান্ডলার
  const handleLikeBtn = async () => {
    if (!user) return toast.warn("Please log in to like");

    const userId = user.id;
    const previousLikes = [...localLikes];
    const previousCount = localLikesCount;

    // ইউআই আপডেট সাথে সাথে
    if (isLike) {
      setLocalLikes((prev) => prev.filter((id) => id !== userId));
      setLocalLikesCount((c) => Math.max(0, c - 1));
    } else {
      setLocalLikes((prev) => [...prev, userId]);
      setLocalLikesCount((c) => c + 1);
    }

    try {
      const result = await lessonLikes({ lessonId: _id, userId });
      router.refresh();
    } catch (error) {
      setLocalLikes(previousLikes);
      setLocalLikesCount(previousCount);
      toast.error("Failed to update like");
    }
  };

  // ২. অপ্টিমিস্টিক ফেভারিট হ্যান্ডলার
  const handleFavoritesBtn = async () => {
    if (!user) return toast.warn("Please log in to add favorites");

    const userId = user.id;
    const previousFavs = [...localFavs];
    const previousCount = localFavsCount;

    if (isFav) {
      setLocalFavs((prev) => prev.filter((id) => id !== userId));
      setLocalFavsCount((c) => Math.max(0, c - 1));
    } else {
      setLocalFavs((prev) => [...prev, userId]);
      setLocalFavsCount((c) => c + 1);
    }

    try {
      const fav = await createFavoritesLesson({
        userId,
        userName: user?.name,
        lessonId: _id,
      });
      if (fav.insertedId) toast.success("Favorites Lesson Added");
      router.refresh();
    } catch (error) {
      setLocalFavs(previousFavs);
      setLocalFavsCount(previousCount);
    }
  };

  // ৩. কমেন্ট সাবমিট হ্যান্ডলার
  const handleUserComments = async () => {
    if (!user) return toast.warn("Please login to comment");
    if (!commentValue.trim()) return toast.error("Comment cannot be empty");

    const comment = {
      lessonId: _id,
      userId: user.id,
      userName: user?.name,
      userImage: user?.image || "https://i.pravatar.cc/150",
      text: commentValue,
    };

    const result = await userComment(comment);
    if (result.insertedId) {
      setCommentValue("");
      toast.success("Comment posted successfully!");
      router.refresh();
    }
  };

  // ৪. সিমিলার লেসন ফিল্টারিং লজিক (সর্বোচ্চ ৬টি কার্ড)
  const similarLessons = allLessons
    .filter(
      (lesson) =>
        lesson._id !== _id &&
        (lesson.category === category ||
          lesson.emotionalTone === emotionalTone),
    )
    .slice(0, 6);

  // অ্যানিমেশন কনফিগ
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-[#12032e] dark:to-[#09021a] text-slate-900 dark:text-purple-50 transition-colors duration-500 pb-16">
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        {/* Banner image aspect ratio fixed to 16/9 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-[32px] border border-slate-100 dark:border-white/[0.06] shadow-md bg-purple-950"
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2.5 mt-6">
          <span className="px-4 py-1 rounded-full bg-purple-100/70 text-purple-700 dark:bg-purple-500/10 dark:text-[#00e5b4] text-xs font-bold border border-purple-200/30">
            {category}
          </span>
          <span className="px-4 py-1 rounded-full bg-blue-100/70 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300 text-xs font-bold border border-blue-200/30">
            {emotionalTone}
          </span>
          <span
            className={`px-4 py-1 rounded-full text-xs font-bold border ${access === "Premium" ? "bg-amber-100/70 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200/30" : "bg-emerald-100/70 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200/30"}`}
          >
            {access}
          </span>
        </div>

        {/* Title */}
        <h1 className="mt-5 text-2xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          {title}
        </h1>

        {/* Quick Stats Summary */}
        <div className="flex flex-wrap gap-5 mt-4 text-xs font-bold text-slate-500 dark:text-purple-300/40 border-b border-slate-100 dark:border-white/[0.05] pb-5">
          <div className="flex items-center gap-1.5">
            <Heart
              className={isLike ? "text-rose-500 fill-rose-500" : ""}
              size={16}
            />{" "}
            {localLikesCount} Likes
          </div>
          <div className="flex items-center gap-1.5">
            <Bookmark
              className={isFav ? "text-violet-500 fill-violet-500" : ""}
              size={16}
            />{" "}
            {localFavsCount} Saved
          </div>
          <div className="flex items-center gap-1.5">
            <Eye size={16} /> {views} Views
          </div>
        </div>

        {/* Lesson Body Story */}
        <div className="mt-8">
          <h2 className="text-xl font-extrabold mb-4 dark:text-white">
            Lesson Story
          </h2>
          <div className="rounded-[24px] border border-slate-100 dark:border-white/[0.05] bg-slate-50/50 dark:bg-[#1a093c]/30 backdrop-blur-md p-6 md:p-8">
            <p className="leading-relaxed text-sm md:text-base text-slate-600 dark:text-purple-100/80 whitespace-pre-wrap">
              {description}
            </p>
          </div>
        </div>

        {/* Metadata grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="rounded-[24px] border border-slate-100 dark:border-white/[0.05] bg-white dark:bg-[#1a093c]/20 p-6">
            <h3 className="text-lg font-bold mb-4 dark:text-white">Metadata</h3>
            <div className="space-y-3.5 text-xs font-bold text-slate-600 dark:text-purple-200/60">
              <div className="flex items-center gap-3">
                <Calendar size={16} />{" "}
                <span>Created: {new Date(createAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={16} />{" "}
                <span>
                  Updated:{" "}
                  {updatedAt
                    ? new Date(updatedAt).toLocaleDateString()
                    : "Original Version"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <User size={16} /> <span>Visibility: {visibility}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} /> <span>{readingTime} min read</span>
              </div>
            </div>
          </div>

          {/* Creator Profile */}
          <div className="rounded-[24px] border border-slate-100 dark:border-white/[0.05] bg-white dark:bg-[#1a093c]/20 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-4 dark:text-white">
                Creator
              </h3>
              <div className="flex items-center gap-3.5">
                <Avatar
                  src={author?.image || "https://i.pravatar.cc/150"}
                  className="w-12 h-12 border-2 border-purple-500/20"
                />
                <div>
                  <h4 className="font-bold text-sm dark:text-white">
                    {author?.name}
                  </h4>
                  <p className="text-xs font-medium text-slate-400 dark:text-purple-300/40">
                    {total.length || 0} Lessons Published
                  </p>
                </div>
              </div>
            </div>
            <Link href={`/author/${_id}`} className="mt-5">
              <Button
                size="sm"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold radius-xl transition-all"
              >
                View Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* User Interaction Actions Bar */}
        <div className="mt-8 pt-5 border-t border-slate-100 dark:border-white/[0.05]">
          <div className="flex flex-wrap gap-3">
            <Button
              size="md"
              onClick={handleLikeBtn}
              className={`font-bold radius-xl ${isLike ? "bg-rose-500 text-white shadow-lg" : "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400"}`}
            >
              <Heart fill={isLike ? "currentColor" : "none"} size={16} />{" "}
              {isLike ? "Liked" : "Like"} ({localLikesCount})
            </Button>
            <Button
              size="md"
              onClick={handleFavoritesBtn}
              className={`font-bold radius-xl ${isFav ? "bg-purple-600 text-white shadow-lg" : "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400"}`}
            >
              <Bookmark fill={isFav ? "currentColor" : "none"} size={16} />{" "}
              {isFav ? "Saved to Favorites" : "Save Favorite"}
            </Button>
            <ReportLessonButton
              lessonId={_id}
              currentUserEmail={user}
              lessonData={lessonData}
            />
          </div>
        </div>

        {/* 6. Comment Section (পোস্ট কমেন্ট এবং ডিসপ্লে লিস্ট) */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-5">
            <MessageSquare
              className="text-purple-600 dark:text-[#00e5b4]"
              size={22}
            />
            <h3 className="text-xl font-extrabold dark:text-white">
              Discussions ({getUserComment?.length || 0})
            </h3>
          </div>

          <div className="rounded-[24px] border border-slate-100 dark:border-white/[0.05] bg-white dark:bg-[#1a093c]/10 p-5 shadow-sm">
            {user ? (
              <div className="space-y-4">
                <TextArea
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                  placeholder="Share your thoughts on this lesson..."
                  variant="bordered"
                  rows={3}
                  disableAnimation
                  classNames={{
                    inputWrapper:
                      "border-slate-200 dark:border-white/[0.08] focus-within:border-purple-500 rounded-xl dark:bg-[#12032e]/40 text-sm",
                  }}
                />
                <div className="flex justify-end">
                  <Button
                    onClick={handleUserComments}
                    className="bg-purple-600 text-white font-bold radius-xl px-6"
                  >
                    Post Comment
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center text-xs font-bold text-slate-400 dark:text-purple-300/30">
                Please{" "}
                <Link href="/login" className="text-purple-600 underline">
                  Login
                </Link>{" "}
                to join the discussion.
              </div>
            )}

            {/* Render getUserComment List */}
            {getUserComment && getUserComment.length > 0 && (
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/[0.05] space-y-4">
                {getUserComment.map((c, i) => (
                  <div
                    key={c._id || i}
                    className="flex gap-3 items-start text-sm"
                  >
                    <Avatar
                      src={c.userImage || "https://i.pravatar.cc/150"}
                      className="w-8 h-8 flex-shrink-0"
                    />
                    <div className="flex-1 bg-slate-50 dark:bg-[#1a093c]/40 rounded-2xl p-3 border border-slate-100 dark:border-white/[0.03]">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs dark:text-purple-200">
                          {c.userName || "Anonymous"}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-purple-300/30 font-medium">
                          {c.formattedDate || "Just now"}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-purple-100/70 text-xs leading-relaxed">
                        {c.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 7. Similar & Recommended Lessons (সর্বোচ্চ ৬টি কার্ড গ্রিড) */}
        <div className="mt-14">
          <h3 className="text-xl font-extrabold mb-5 dark:text-white">
            Recommended for You
          </h3>
          {similarLessons.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarLessons.map((lesson) => (
                <motion.div
                  key={lesson._id}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="flex flex-col bg-white dark:bg-[#1a093c]/40 border border-slate-100 dark:border-white/[0.06] rounded-2xl overflow-hidden shadow-sm group transition-all"
                >
                  <div className="relative aspect-[16/10] w-full bg-slate-100 dark:bg-[#12032e]">
                    <Image
                      src={lesson.imageUrl}
                      alt={lesson.title}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold text-purple-600 dark:text-[#00e5b4] tracking-wider uppercase">
                        {lesson.category}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-purple-50 mt-1 line-clamp-2 min-h-[40px] group-hover:text-purple-600 dark:group-hover:text-[#00e5b4] transition-colors">
                        {lesson.title}
                      </h4>
                    </div>
                    <Link
                      href={`/lessons/${lesson._id}`}
                      className="mt-4 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-purple-300/50 group-hover:text-purple-600 dark:group-hover:text-[#00e5b4] transition-colors"
                    >
                      <span>Read Story</span>
                      <ArrowRight
                        size={14}
                        className="transform group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 border border-dashed border-slate-200 dark:border-white/[0.06] rounded-[24px] text-xs font-bold text-slate-400 dark:text-purple-300/30">
              No recommended lessons found right now.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

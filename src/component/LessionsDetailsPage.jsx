"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Eye,
  Heart,
  Bookmark,
  Flag,
  User,
} from "lucide-react";
import { lessonLikes } from "@/lib/api/lessons";
import { useRouter } from "next/navigation";
import { createFavoritesLesson } from "@/lib/action/favorites";
import { toast } from "react-toastify";
import ReportLessonButton from "./ReportLessonButton";

export default function LessonDetails({ lessonData, user = null, total }) {
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
    likes,
    likesCount = 0,
    favorites,
    favoritesCount = 0,
  } = lessonData;

  const views = 100;

  const readingTime = Math.ceil((description?.split(" ").length || 0) / 200);
  const router = useRouter();

  const isFav = favorites.includes(user?.id);
  const isLike = likes.includes(user?.id);

  const handleLikeBtn = async () => {
    if (!user) {
      return toast.warn("Please log in to like");
    }

    const newLikes = {
      lessonId: _id,
      userId: user?.id,
    };

    const likeCount = await lessonLikes(newLikes);

    if (likeCount.liked === false) {
      router.refresh();
    }

    if (likeCount.liked === true) {
      router.refresh();
    }
  };

  // Favorite Item Add
  const handleFavoritesBtn = async () => {
    const FavoriteItem = {
      userId: user?.id,
      userName: user?.name,
      lessonId: _id,
    };
    console.log("object");
    const fav = await createFavoritesLesson(FavoriteItem);

    if (fav.insertedId) {
      toast.success("Favorites Lesson Added");
    }
    if (fav.message) {
      toast.error("Already added in favorites");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090B]">
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        {/* Hero Image */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-zinc-800">
          <div className="relative h-[250px] md:h-[450px] w-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-3 mt-6">
          <span className="px-4 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300 text-sm font-medium">
            {category}
          </span>

          <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300 text-sm font-medium">
            {emotionalTone}
          </span>

          <span
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              access === "Premium"
                ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
            }`}
          >
            {access}
          </span>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h1>

        {/* Stats */}
        <div className="flex flex-wrap gap-6 mt-6 text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Heart fill={isLike ? "currentColor" : "none"} size={18} />
            <span>{likesCount} Likes</span>
          </div>

          <div className="flex items-center gap-2">
            <Bookmark fill={isFav ? "currentColor" : "none"} size={18} />
            <span>{favoritesCount} Favorites</span>
          </div>

          <div className="flex items-center gap-2">
            <Eye size={18} />
            <span>{views} Views</span>
          </div>
        </div>

        {/* Description */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-5 text-slate-900 dark:text-white">
            Lesson Story
          </h2>

          <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-8">
            <p className="leading-8 text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
              {description}
            </p>
          </div>
        </div>

        {/* Metadata + Author */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          {/* Metadata */}
          <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
            <h3 className="text-xl font-bold mb-5 text-slate-900 dark:text-white">
              Lesson Metadata
            </h3>

            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-3">
                <Calendar size={18} />
                <span>Created: {new Date(createAt).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar size={18} />
                <span>
                  Updated:{" "}
                  {updatedAt
                    ? new Date(updatedAt).toLocaleDateString()
                    : "Not Updated"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <User size={18} />
                <span>Visibility: {visibility}</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock size={18} />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>

          {/* Author Card */}
          <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
            <h3 className="text-xl font-bold mb-5 text-slate-900 dark:text-white">
              Creator
            </h3>

            <div className="flex items-center gap-4">
              <Image
                src={author?.image || "https://i.pravatar.cc/150"}
                alt={author?.name || "Author"}
                width={70}
                height={70}
                className="rounded-full border border-slate-200 dark:border-zinc-700"
              />

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">
                  {author?.name}
                </h4>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {total.length} Lessons Published
                </p>
              </div>
            </div>

            <Link href={`/author/${_id}`} className="inline-block mt-6">
              <button className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium transition">
                View All Lessons
              </button>
            </Link>
          </div>
        </div>

        {/* Interaction Buttons */}
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-5 text-slate-900 dark:text-white">
            Interactions
          </h3>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleLikeBtn}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400 font-medium cursor-pointer"
            >
              <Heart fill={isLike ? "currentColor" : "none"} size={18} />
              Like <span>{likesCount}</span>
            </button>

            <button
              onClick={handleFavoritesBtn}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400 font-medium"
            >
              <Bookmark fill={isFav ? "currentColor" : "none"} size={18} />
              Save Favorite
            </button>

            {/* <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400 font-medium">
              <Flag size={18} />
              Report Lesson
            </button> */}
            <ReportLessonButton
              lessonId={_id}
              currentUserEmail={user}
              lessonData={lessonData}
            ></ReportLessonButton>
          </div>
        </div>

        {/* Comments */}
        <div className="mt-14">
          <h3 className="text-2xl font-bold mb-5 text-slate-900 dark:text-white">
            Comments
          </h3>

          <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
            <textarea
              rows={4}
              placeholder="Write your comment..."
              className="w-full rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-800 dark:text-slate-200 p-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            <button className="mt-4 px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium transition">
              Post Comment
            </button>
          </div>
        </div>

        {/* Similar Lessons */}
        <div className="mt-14">
          <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
            Similar Lessons
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Similar Lesson Cards */}
          </div>
        </div>
      </div>
    </div>
  );
}

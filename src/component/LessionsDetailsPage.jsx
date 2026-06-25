"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Eye,
  Heart,
  Bookmark,
  User,
  MessageSquare,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Share2,
} from "lucide-react";
import { Button, Avatar, Card, TextArea } from "@heroui/react";
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
  getUserComment = [],
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

  // লোকাল স্টেটস (অপ্টিমিস্টিক আপডেটের জন্য)
  const [commentValue, setCommentValue] = useState("");
  const [localLikes, setLocalLikes] = useState(likes);
  const [localLikesCount, setLocalLikesCount] = useState(likesCount);
  const [localFavs, setLocalFavs] = useState(favorites);
  const [localFavsCount, setLocalFavsCount] = useState(favoritesCount);

  useEffect(() => {
    setLocalLikes(likes);
    setLocalLikesCount(likesCount);
    setLocalFavs(favorites);
    setLocalFavsCount(favoritesCount);
  }, [likes, likesCount, favorites, favoritesCount]);

  const isLike = localLikes.includes(user?.id);
  const isFav = localFavs.includes(user?.id);

  const handleLikeBtn = async () => {
    if (!user) return toast.warn("Please log in to like");
    const userId = user.id;
    const previousLikes = [...localLikes];
    const previousCount = localLikesCount;

    if (isLike) {
      setLocalLikes((prev) => prev.filter((id) => id !== userId));
      setLocalLikesCount((c) => Math.max(0, c - 1));
    } else {
      setLocalLikes((prev) => [...prev, userId]);
      setLocalLikesCount((c) => c + 1);
    }

    try {
      await lessonLikes({ lessonId: _id, userId });
      router.refresh();
    } catch (error) {
      setLocalLikes(previousLikes);
      setLocalLikesCount(previousCount);
      toast.error("Failed to update like");
    }
  };

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
      if (fav?.insertedId) toast.success("Lesson saved to dashboard");
      router.refresh();
    } catch (error) {
      setLocalFavs(previousFavs);
      setLocalFavsCount(previousCount);
    }
  };

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
    if (result?.insertedId) {
      setCommentValue("");
      toast.success("Discussion point generated!");
      router.refresh();
    }
  };

  const similarLessons = allLessons
    .filter(
      (lesson) =>
        lesson._id !== _id &&
        (lesson.category === category || lesson.emotionalTone === emotionalTone)
    )
    .slice(0, 3); 
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-gradient-to-br dark:from-[#1b073e] dark:to-[#0b0214] text-slate-900 dark:text-purple-50 transition-colors duration-500 pb-24 relative overflow-hidden">
      
      {/* Background Neon Ambient Aura */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#00e5b4]/5 blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-4 pt-12 max-w-6xl relative z-10 space-y-10">
        
        {/* UPPER PORTION: HERO STREAM BANNER (Linear Aspect Master) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <motion.div className="relative aspect-[21/9] w-full overflow-hidden rounded-[36px] border border-slate-200/60 dark:border-white/[0.08] shadow-2xl bg-[#12032e]">
            <Image
              src={imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"}
              alt={title}
              sizes="(max-width: 968px) 100vw, 33vw"
              fill
              className="object-cover group-hover:scale-102 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            
            {/* Opaque Badge Overlay on Banner */}
            <div className="absolute bottom-6 left-6 md:left-10 flex flex-wrap gap-2">
              <span className="px-3.5 py-1 rounded-xl bg-slate-950/60 backdrop-blur-md text-white text-[11px] font-black tracking-wider uppercase border border-white/10">
                {category}
              </span>
              <span className="px-3.5 py-1 rounded-xl bg-slate-950/60 backdrop-blur-md text-[#00e5b4] text-[11px] font-black tracking-wider uppercase border border-[#00e5b4]/20">
                {emotionalTone}
              </span>
              <span className={`px-3.5 py-1 rounded-xl text-[11px] font-black tracking-wider uppercase backdrop-blur-md border ${
                access === "Premium" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
              }`}>
                {access} Plan
              </span>
            </div>
          </motion.div>

          {/* Title Area */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              {title}
            </h1>
            
            {/* Quick Micro Metrics Stats */}
            <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-slate-400 dark:text-purple-300/40">
              <div className="flex items-center gap-2">
                <Heart size={15} className={isLike ? "text-rose-500 fill-rose-500" : "text-slate-400"} />
                <span className="text-slate-700 dark:text-purple-100">{localLikesCount} Appreciations</span>
              </div>
              <div className="flex items-center gap-2">
                <Bookmark size={15} className={isFav ? "text-[#00e5b4] fill-[#00e5b4]" : "text-slate-400"} />
                <span className="text-slate-700 dark:text-purple-100">{localFavsCount} Bookmarked</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={15} />
                <span>{views} Matrix Views</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={15} />
                <span>{readingTime} Min Engine Read</span>
              </div>
            </div>
          </div>
        </motion.div>
              
        {/* CORE GRID ARCHITECTURE: STORY KNOWLEDGE LAYER VS METADATA SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT CONTENT: THE LESSON STORY */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 px-1">
              <Sparkles size={16} className="text-indigo-500 dark:text-[#00e5b4]" />
              <h2 className="text-xs font-black text-slate-400 dark:text-purple-300/40 uppercase tracking-widest">
                Curriculum Asset Narrative
              </h2>
            </div>
            
            <Card className="rounded-[32px] border border-slate-200/60 dark:border-white/[0.06] bg-white dark:bg-[#1f0c41]/40 backdrop-blur-xl shadow-sm">
              <div className="p-6 md:p-8">
                <p className="leading-[1.75] text-sm md:text-base text-slate-600 dark:text-purple-100/90 whitespace-pre-wrap font-medium tracking-normal">
                  {description}
                </p>
              </div>
            </Card>

            {/* INTERACTIVE CONTROLS BAR */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                onClick={handleLikeBtn}
                className={`font-black text-xs h-10 px-5 rounded-xl transition-all gap-2 ${
                  isLike 
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20" 
                    : "bg-white dark:bg-white/[0.04] text-rose-500 border border-slate-200 dark:border-white/[0.06]"
                }`}
              >
                <Heart fill={isLike ? "currentColor" : "none"} size={14} />
                {isLike ? "Appreciated" : "Appreciate Resource"}
              </Button>

              <Button
                onClick={handleFavoritesBtn}
                className={`font-black text-xs h-10 px-5 rounded-xl transition-all gap-2 ${
                  isFav 
                    ? "bg-indigo-600 dark:bg-[#00e5b4] text-white dark:text-slate-950 shadow-lg" 
                    : "bg-white dark:bg-white/[0.04] text-indigo-600 dark:text-purple-300 border border-slate-200 dark:border-white/[0.06]"
                }`}
              >
                <Bookmark fill={isFav ? "currentColor" : "none"} size={14} />
                {isFav ? "Saved to Base" : "Save Module"}
              </Button>

              <ReportLessonButton
                lessonId={_id}
                currentUserEmail={user}
                lessonData={lessonData}
              />
            </div>
          </div>

          {/* RIGHT SIDEBAR: CREATOR INTERFACE MODULE & ENGINE METADATA */}
          <div className="space-y-6">
            
            {/* WIDGET 1: CREATOR BLOCK */}
            <Card className="rounded-[28px] border border-slate-200/60 dark:border-white/[0.06] bg-white dark:bg-[#1f0c41]/30 backdrop-blur-xl p-5 shadow-sm">
              <div className="space-y-5">
                <h3 className="text-xs font-black text-slate-400 dark:text-purple-300/40 uppercase tracking-widest">Verified Educator</h3>
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <Avatar
                      src={author?.image || "https://i.pravatar.cc/150"}
                      className="w-12 h-12 border-2 border-indigo-500/20"
                    />
                    <span className="absolute bottom-0 right-0 bg-[#00e5b4] text-slate-950 p-0.5 rounded-full border border-white dark:border-[#12032e]">
                      <ShieldCheck size={10} strokeWidth={3} />
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-slate-800 dark:text-white">{author?.name || "Anonymous Creator"}</h4>
                    <p className="text-[11px] font-bold text-slate-400 dark:text-purple-300/30 mt-0.5">
                      {total?.length || 0} Dynamic Publications
                    </p>
                  </div>
                </div>
                <Link href={`/author/${_id}`} className="block w-full">
                  <Button className="w-full h-10 font-bold text-xs bg-indigo-50 dark:bg-white/[0.04] text-indigo-600 dark:text-[#00e5b4] border dark:border-white/[0.05] rounded-xl transition-all">
                    Examine Profile
                  </Button>
                </Link>
              </div>
            </Card>

            {/* WIDGET 2: ENGINE METADATA BOX */}
            <Card className="rounded-[28px] border border-slate-200/60 dark:border-white/[0.06] bg-white dark:bg-[#1f0c41]/30 backdrop-blur-xl p-5 shadow-sm">
              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-400 dark:text-purple-300/40 uppercase tracking-widest">System Registry</h3>
                <div className="space-y-3 text-xs font-bold text-slate-600 dark:text-purple-200/70">
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-white/[0.04]">
                    <div className="flex items-center gap-2 opacity-70"><Calendar size={14} /> <span>Compiled</span></div>
                    <span className="text-slate-800 dark:text-purple-100">{new Date(createAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-white/[0.04]">
                    <div className="flex items-center gap-2 opacity-70"><Calendar size={14} /> <span>Modified</span></div>
                    <span className="text-slate-800 dark:text-purple-100">
                      {updatedAt ? new Date(updatedAt).toLocaleDateString() : "Base Stack Version"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2 opacity-70"><User size={14} /> <span>Visibility</span></div>
                    <span className="text-slate-800 dark:text-[#00e5b4] uppercase text-[10px] bg-indigo-50 dark:bg-[#00e5b4]/10 border dark:border-[#00e5b4]/20 px-2 py-0.5 rounded-md">
                      {visibility || "Public"}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

          </div>
        </div>

        {/* DISCUSSION & DISCOURSE MANAGEMENT INTERFACE */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 px-1">
            <MessageSquare className="text-indigo-500 dark:text-[#00e5b4]" size={16} />
            <h3 className="text-xs font-black text-slate-400 dark:text-purple-300/40 uppercase tracking-widest">
              Discussions ({getUserComment?.length || 0})
            </h3>
          </div>

          <Card className="rounded-[32px] border border-slate-200/60 dark:border-white/[0.06] bg-white dark:bg-[#1f0c41]/20 backdrop-blur-xl p-5 md:p-6 shadow-sm">
            {user ? (
              <div className="space-y-4">
                <TextArea
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                  placeholder="Contribute to this technical knowledge framework..."
                  variant="bordered"
                  minRows={6}
                  className='w-full dark:text-white'
                  classNames={{
                    inputWrapper: "border-slate-200 dark:border-white/[0.08] focus-within:border-indigo-500 dark:focus-within:border-[#00e5b4] rounded-2xl bg-slate-50 dark:bg-[#12032e]/50 text-sm py-3",
                    input: "placeholder:text-slate-400 dark:placeholder:text-purple-300/30 text-slate-800 dark:text-purple-50"
                  }}
                />
                <div className="flex justify-end">
                  <Button
                    onClick={handleUserComments}
                    className="bg-indigo-600 text-white dark:bg-[#00e5b4] dark:text-slate-950 font-black text-xs h-10 px-6 rounded-xl transition-all shadow-md shadow-indigo-600/10 dark:shadow-[#00e5b4]/10"
                  >
                    Commit Point
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-xs font-bold text-slate-400 dark:text-purple-300/30 bg-slate-50 dark:bg-[#12032e]/30 border border-dashed border-slate-200 dark:border-white/[0.05] rounded-2xl">
                Authentication required. Please{" "}
                <Link href="/login" className="text-indigo-600 dark:text-[#00e5b4] underline hover:opacity-80">
                  Authorize Account
                </Link>{" "}
                to inject discussion points.
              </div>
            )}

            {/* DISCUSSION NODE DISPLAY LIST */}
            {getUserComment?.length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/[0.05] space-y-4">
                {getUserComment.map((c, i) => (
                  <motion.div
                    key={c._id || i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-4 items-start text-sm"
                  >
                    <Avatar
                      src={c.userImage || "https://i.pravatar.cc/150"}
                      className="w-9 h-9 flex-shrink-0 border dark:border-white/10"
                    />
                    <div className="flex-1 bg-slate-50 dark:bg-[#12032e]/40 rounded-2xl p-4 border border-slate-100 dark:border-white/[0.03]">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-black text-xs text-slate-800 dark:text-purple-200">
                          {c.userName || "Anonymous Network User"}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-purple-300/30 font-bold uppercase tracking-wider">
                          {c.formattedDate || "Active Sync"}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-purple-200/80 text-xs leading-relaxed font-medium">
                        {c.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* SIMILAR RECOMMENDATIONS: MATRIX INDEX GRID */}
        <div className="space-y-5">
          <h3 className="text-xs font-black text-slate-400 dark:text-purple-300/40 uppercase tracking-widest pl-1">
            Recommended Channels
          </h3>
          {similarLessons.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarLessons.map((lesson) => (
                <motion.div
                  key={lesson._id}
                  whileHover={{ y: -5 }}
                  className="flex flex-col bg-white dark:bg-[#1f0c41]/30 border border-slate-200/60 dark:border-white/[0.06] rounded-[24px] overflow-hidden shadow-sm group transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] w-full bg-slate-100 dark:bg-[#12032e]">
                    <Image
                      src={lesson.imageUrl}
                      alt={lesson.title}
                      fill
                      className="object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-black text-indigo-600 dark:text-[#00e5b4] tracking-widest uppercase">
                        {lesson.category}
                      </span>
                      <h4 className="text-sm font-black text-slate-800 dark:text-purple-50 mt-1 line-clamp-2 min-h-[40px] group-hover:text-indigo-600 dark:group-hover:text-[#00e5b4] transition-colors leading-snug">
                        {title}
                      </h4>
                    </div>
                    <Link
                      href={`/publicLessons/${lesson._id}`}
                      className="flex items-center justify-between text-xs font-bold text-slate-400 dark:text-purple-300/40 group-hover:text-indigo-600 dark:group-hover:text-[#00e5b4] transition-colors"
                    >
                      <span>Read Narrative</span>
                      <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 border border-dashed border-slate-200 dark:border-white/[0.06] rounded-[24px] text-xs font-bold text-slate-400 dark:text-purple-300/30 bg-white dark:bg-white/[0.01]">
              No matching structural records compiled inside this index.
            </div>
          )}
        </div>

      </div>
      
    </div>
  )
}
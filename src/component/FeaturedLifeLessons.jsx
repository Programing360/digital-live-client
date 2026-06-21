"use client";

import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Inline Icons matching image_3735a3.png
const SectionStarIcon = () => (
  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-50 text-purple-600">
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  </div>
);

const HeartIcon = () => (
  <svg className="w-4 h-4 text-rose-500 fill-rose-500" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const BookmarkIcon = () => (
  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
);

const lessonsData = [
  {
    id: 1,
    title: "The Power of Positive Thinking",
    description: "Your thoughts shape your reality. Choose positivity and watch your world transform.",
    tag: "Mindset",
    tagStyles: "bg-indigo-600/90 text-white",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=500&auto=format&fit=crop&q=80",
    likes: 245,
    bookmarks: 543,
    author: {
      name: "Nusrat Jahan",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    },
  },
  {
    id: 2,
    title: "Small Steps Every Day",
    description: "Great things never came from comfort zones. Keep showing up for yourself.",
    tag: "Growth",
    tagStyles: "bg-emerald-100 text-emerald-800 font-bold",
    image: "https://images.unsplash.com/photo-1530603768230-3759979bad90?w=500&auto=format&fit=crop&q=80",
    likes: 312,
    bookmarks: 678,
    author: {
      name: "Tanvir Rahman",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    },
  },
  {
    id: 3,
    title: "Letting Go is Sometimes the Best Choice",
    description: "Not everything is meant to stay in your life forever. And that's okay.",
    tag: "Life",
    tagStyles: "bg-orange-100 text-orange-700 font-bold",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=500&auto=format&fit=crop&q=80",
    likes: 198,
    bookmarks: 421,
    author: {
      name: "Meher Afroz",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    },
  },
];

export default function FeaturedLifeLessons() {
  
  // AOS-style Frame Motion configurations
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] } 
    }
  };

  const gridContainerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 // Smooth progressive staggering gap
      }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 70, damping: 14 } 
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden select-none">
      
      {/* Header Viewport AOS Reveal Container */}
      <motion.div 
        variants={fadeInUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div className="flex items-start gap-3">
          <SectionStarIcon />
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Featured Life Lessons
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-0.5">
              Handpicked lessons from our amazing community
            </p>
          </div>
        </div>
        
        <Link href={'/publicLessons'}>
          <Button
          variant="bordered"
          className="border-purple-200 border shadow-2xl text-purple-600 font-semibold hover:bg-purple-50/50 self-start sm:self-auto transition-all px-5 h-9 active:scale-95"
          radius="md"
        >
          View All
        </Button>
        </Link>
      </motion.div>

      {/* Staggered Cards Workspace Container */}
      <motion.div 
        variants={gridContainerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-8px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {lessonsData.map((lesson) => (
          <motion.div 
            key={lesson.id} 
            variants={cardVariant}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_15px_30px_-10px_rgba(99,102,241,0.12)] transition-shadow duration-300 group cursor-pointer"
          >
            {/* Image Box Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50">
              <Image 
                src={lesson.image} 
                alt={lesson.title}
                width='40'
                height='40'
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <span className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full shadow-sm select-none ${lesson.tagStyles}`}>
                {lesson.tag}
              </span>
            </div>

            {/* Typography Content Meta */}
            <div className="flex flex-col flex-1 p-5">
              <h3 className="text-base font-bold text-slate-900 leading-snug min-h-[44px] group-hover:text-[#5850EC] transition-colors duration-200">
                {lesson.title}
              </h3>
              <p className="text-xs font-medium text-slate-500 leading-relaxed mt-1.5 flex-1 line-clamp-2">
                {lesson.description}
              </p>

              {/* Card Footer Base Bar */}
              <div className="flex items-center justify-between mt-6 pt-3 border-t border-slate-100/60">
                <div className="flex items-center gap-2">
                  <img 
                    src={lesson.author.avatar} 
                    alt={lesson.author.name} 
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-100"
                  />
                  <span className="text-xs font-bold text-slate-700">
                    {lesson.author.name}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-slate-500 font-bold text-[11px]">
                  <div className="flex items-center gap-1.5 transition-colors hover:text-rose-500">
                    <HeartIcon />
                    <span>{lesson.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 transition-colors hover:text-indigo-600">
                    <BookmarkIcon />
                    <span>{lesson.bookmarks}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
    </section>
  );
}
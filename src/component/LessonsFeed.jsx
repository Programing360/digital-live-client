"use client";

import React, { useState, useMemo } from "react";
import { Input, Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon, ChevronDown, Funnel } from "lucide-react";
import LessonCard from "./LessonsCard";
import LessonsContainer from "./LessonsContainer";

const categoriesList = [
  "All Lessons",
  "Mindset",
  "Growth",
  "Life",
  "Career",
  "Relationships",
  "Health",
];

// Framer Motion Variants for Layout Animations
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function LessonsFeed({
   allLessons = [],
  userPlan = "Free",
  favorites,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  console.log(allLessons);
  const handleCategoryChange = (category) => {
    if (category === "All Lessons") {
      setSelectedCategories([]);
      return;
    }

    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    );
  };

  const filteredLessons = useMemo(() => {
    return allLessons.filter((lesson) => {
      const matchesSearch =
        lesson?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson?.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(lesson.category);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategories, allLessons]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-default-50/30 dark:bg-gradient-to-b dark:from-[#12032e] dark:to-[#12032e] min-h-screen transition-colors duration-500">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">
          Public Lessons
        </h1>
        <p className="text-sm text-default-400 dark:text-purple-300/50 mt-1">
          Discover wisdom from our community
        </p>
      </motion.div>

      {/* Search & Filter Bar */}
      <div className="flex gap-3 mb-8 w-full items-center">
        <Input
          type="text"
          placeholder="Search lessons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startContent={
            <SearchIcon
              className="text-default-400 dark:text-purple-300/40 "
              size={18}
            />
          }
          radius="lg"
          variant="bordered"
          className="w-full dark:text-white"
          isClearable
          onClear={() => setSearchQuery("")}
          classNames={{
            inputWrapper:
              "dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-purple-500/50 focus-within:!border-purple-500",
            input: "dark:text-purple-100 placeholder:dark:text-purple-300/30 ",
          }}
        />

        {/* Filters Button with Neon Teal Hover Aspect */}
        <Button className="bg-indigo-600 dark:bg-[#00e5b4] text-white dark:text-slate-950 font-bold h-10 px-5 rounded-xl hidden sm:flex gap-2 transition-all shadow-md shadow-indigo-600/10 dark:shadow-[#00e5b4]/10 hover:opacity-90">
          <Funnel size={16} /> Filters
        </Button>
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Categories Box */}
        <div className="w-full md:w-64 shrink-0 bg-white dark:bg-[#1a093c]/90 border border-slate-100 dark:border-white/[0.08] backdrop-blur-xl rounded-[24px] p-6 h-fit shadow-sm transition-all">
          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-full flex items-center justify-between"
          >
            <h3 className="font-bold text-sm text-slate-800 dark:text-purple-100 uppercase tracking-wider">
              Categories
            </h3>
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 dark:text-purple-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Desktop Title */}
          <h3 className="hidden md:block font-bold text-sm text-slate-800 dark:text-purple-200/80 uppercase tracking-wider mb-4">
            Categories
          </h3>

          {/* Categories Buttons List */}
          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } md:flex flex-col gap-2.5 mt-4 md:mt-0`}
          >
            {categoriesList.map((category) => {
              const isSelected =
                category === "All Lessons"
                  ? selectedCategories.length === 0
                  : selectedCategories.includes(category);

              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 border relative
                    ${
                      isSelected
                        ? "bg-violet-100 text-violet-600 dark:bg-white/[0.04] dark:text-[#00e5b4] border-violet-200 dark:border-white/[0.1] shadow-sm"
                        : "bg-transparent text-slate-600 dark:text-purple-200/60 border-slate-200 dark:border-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.02]"
                    }
                  `}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="activeDot"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-[#00e5b4]"
                    />
                  )}
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lessons Content Grid Area */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {filteredLessons.length > 0 ? (
              <motion.div
                key="grid"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className=" "
              >
                
                  <motion.div variants={itemVariants} layout className="w-full ">
                    {/* <LessonCard
                      lesson={lesson}
                      userPlan={userPlan}
                      favorites={favorites}
                    /> */}
                    <LessonsContainer
                      allLessons={allLessons}
                      userPlan={userPlan}
                      favorites={favorites}
                    ></LessonsContainer>
                  </motion.div>
          
              </motion.div>
            ) : (
              /* empty state animated element */
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-20 bg-white dark:bg-[#1a093c]/50 border border-slate-100 dark:border-white/[0.06] rounded-[24px]"
              >
                <p className="text-default-400 dark:text-purple-300/40 text-sm font-medium">
                  No life lessons found matching your filters.
                </p>

                <Button
                  size="sm"
                  variant="flat"
                  className="mt-4 font-bold bg-violet-50 dark:bg-white/[0.04] text-violet-600 dark:text-[#00e5b4]"
                  onPress={() => {
                    setSearchQuery("");
                    setSelectedCategories([]);
                  }}
                >
                  Reset Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

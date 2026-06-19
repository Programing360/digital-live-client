"use client";

import React, { useState, useMemo } from "react";
import { Input, Button } from "@heroui/react";
import {
  SearchIcon,
  SlidersHorizontal,
  ChevronDown,
  Funnel,
} from "lucide-react";
import LessonCard from "./LessonsCard";

const categoriesList = [
  "All Lessons",
  "Mindset",
  "Growth",
  "Life",
  "Career",
  "Relationships",
  "Health",
];

export default function LessonsFeed({
  initialLessons = [],
  userPlan = "Free",
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = (category) => {
    if (category === "All Lessons") {
      setSelectedCategories([]);
      return;
    }

    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const filteredLessons = useMemo(() => {
    return initialLessons.filter((lesson) => {
      const matchesSearch =
        lesson?.title
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        lesson?.description
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(lesson.category);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategories, initialLessons]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-default-50/30 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">
          Public Lessons
        </h1>
        <p className="text-sm text-default-400 mt-1">
          Discover wisdom from our community
        </p>
      </div>

      {/* Search */}
      <div className="flex gap-3 mb-8 w-full items-center">
        <Input
          type="text"
          placeholder="Search lessons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startContent={
            <SearchIcon className="text-default-400" size={18} />
          }
          radius="lg"
          variant="bordered"
          className="w-full"
          isClearable
          onClear={() => setSearchQuery("")}
        />

        <Button
          className="bg-indigo-600 text-white font-bold h-10 px-5 rounded-xl hidden sm:flex gap-2"
        //   startContent={<SlidersHorizontal size={16} />}
        >
         <Funnel /> Filters 
        </Button>
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-[24px] p-6 h-fit shadow-sm">
          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-full flex items-center justify-between"
          >
            <h3 className="font-bold text-sm text-slate-800 dark:text-zinc-100 uppercase tracking-wider">
              Categories
            </h3>

            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Desktop Title */}
          <h3 className="hidden md:block font-bold text-sm text-slate-800 dark:text-zinc-100 uppercase tracking-wider mb-4">
            Categories
          </h3>

          {/* Categories */}
          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } md:flex flex-col gap-3 mt-4 md:mt-0`}
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
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border dark:text-white
                    ${
                      isSelected
                        ? "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400 shadow-md"
                        : "bg-transparent border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800"
                    }
                  `}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="flex-1">
          {filteredLessons.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredLessons.map((lesson) => (
                <LessonCard
                  key={lesson._id}
                  lesson={lesson}
                  userPlan={userPlan}
                  
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-[24px]">
              <p className="text-default-400 text-sm font-medium">
                No life lessons found matching your filters.
              </p>

              <Button
                size="sm"
                variant="flat"
                color="secondary"
                className="mt-4 font-bold"
                onPress={() => {
                  setSearchQuery("");
                  setSelectedCategories([]);
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


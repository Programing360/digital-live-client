"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Input,
  Button,
  Spinner,
  Select,
  Label,
  ListBox,
  Separator,
  Description,
} from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SearchIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  SortDesc,
} from "lucide-react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import LessonCard from "./LessonsCard";

const categoriesList = [
  "All Lessons",
  "Mindset",
  "Productivity",
  "Technology",
  "Career",
  "Relationships",
  "Mental Health",
  "Personal Growth",
];
const tonesList = [
  "Motivational",
  "Grateful",
  "Peaceful",
  "Sad",
  "Happy",
  "Neutral",
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function LessonsFeed({ userPlan = "Free", favorites }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlPage = parseInt(searchParams.get("page")) || 1;
  const isFirstRender = useRef(true);

  const [tempSearch, setTempSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [currentPage, setCurrentPage] = useState(urlPage);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortKeys, setSortKeys] = useState(new Set(["newest"]));
  const [selectedToneKeys, setSelectedToneKeys] = useState(new Set(["All"]));
  const itemsPerPage = 6;

  const fetchLessons = async (page, search, categories) => {
    try {
      setLoading(true);
      const toneId = [...selectedToneKeys][0];
      console.log(toneId);

      const categoryQuery =
        categories.length > 0 ? `&category=${categories.join(",")}` : "";

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/lessonsPage?page=${page}&limit=${itemsPerPage}&search=${search}${categoryQuery}`,
      );
      const data = await res.json();
      setLessons(data.lessons || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      toast.error("Error fetching filtered lessons data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setCurrentPage(1);
    router.push(`?page=1`, { scroll: false });
    fetchLessons(1, searchQuery, selectedCategories);
    setSearchQuery(tempSearch);
  }, [searchQuery, selectedCategories]);

  useEffect(() => {
    fetchLessons(urlPage, searchQuery, selectedCategories);
    setCurrentPage(urlPage);
  }, [urlPage]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();

    setCurrentPage(1);

    router.push(`?page=1`, { scroll: false });

    setSearchQuery(tempSearch);
  };

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
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    router.push(`?page=${pageNumber}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //   useEffect(() => {
  //   const toneId = [...selectedToneKeys][0];

  //   const fetchLessons = async () => {
  //     const res = await fetch(
  //       `http://localhost:5000/api/lessons?tone=${toneId}`
  //     );

  //     const data = await res.json();
  //     console.log(data);
  //   };

  //   fetchLessons();
  // }, [selectedToneKeys]);

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

      <div className="flex flex-col md:flex-row gap-14 mb-8 items-center ">
        {/* Search Input Box with Action Button */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex gap-3  w-full items-center"
        >
          <Input
            type="text"
            placeholder="Search lessons..."
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
            radius="lg"
            variant="bordered"
            className="w-full dark:text-white"
            
          />

          <Button
            type="submit"
            className="bg-indigo-600 dark:bg-[#00e5b4] text-white dark:text-slate-950 font-bold h-11 px-6 rounded-xl flex gap-2 transition-all shadow-md shadow-indigo-600/10 dark:shadow-[#00e5b4]/10 hover:opacity-90"
          >
            <Search size={16} /> Search
          </Button>
        </form>
        {/* Sort Dropdown — Updated to HeroUI v3.1.0 */}
        <div className="w-full md:w-56">
          <Select selectedKeys={sortKeys} onChange={setSortKeys}>
            {/* <Label className="text-xs text-default-400 font-semibold mb-1 block">
              Sort Order
            </Label> */}
            <Select.Trigger className="w-full flex items-center justify-between border dark:border-white/10 rounded-xl px-3 py-2 bg-white dark:bg-[#1a093c] h-11 text-sm text-slate-700 dark:text-purple-100">
              <span className="flex items-center gap-2">
                <SortDesc size={16} className="text-purple-500" />
                <Select.Value />
              </span>
              <Select.Indicator>
                <ChevronDown size={16} className="text-default-400" />
              </Select.Indicator>
            </Select.Trigger>

            <Select.Popover className="dark:bg-[#1a093c] border dark:border-white/10 rounded-xl shadow-xl mt-1 overflow-hidden p-1">
              <ListBox className="p-1 gap-1">
                <ListBox.Item
                  key="newest"
                  className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer text-slate-700 dark:text-white"
                >
                  <Label className="dark:text-white">Newest First</Label>
                </ListBox.Item>
                <ListBox.Item
                  key="mostSaved"
                  className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer text-white-700 dark:text-purple-200"
                >
                  <Label className="dark:text-white">Most Saved</Label>
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>

      {/* Layout Grid */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Categories Box */}
        <div className="w-full md:w-64 shrink-0">
          <div className=" bg-white dark:bg-[#1a093c]/90 border border-slate-100 dark:border-white/[0.08] backdrop-blur-xl rounded-[24px] p-6 h-fit shadow-sm transition-all">
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden w-full flex items-center justify-between"
              >
                <h3 className="font-bold text-sm text-slate-800 dark:text-purple-100 uppercase tracking-wider">
                  Categories
                </h3>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 dark:text-purple-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              <h3 className="hidden md:block font-bold text-sm text-slate-800 dark:text-purple-200/80 uppercase tracking-wider mb-4">
                Categories
              </h3>

              <div
                className={`${isOpen ? "flex" : "hidden"} md:flex flex-col gap-2.5 mt-4 md:mt-0`}
              >
                {categoriesList.map((category) => {
                  const isSelected =
                    category === "All Lessons"
                      ? selectedCategories.length === 0
                      : selectedCategories.includes(category);
                  return (
                    <button
                      type="button"
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 border relative ${
                        isSelected
                          ? "bg-violet-100 text-violet-600 dark:bg-white/[0.04] dark:text-[#00e5b4] border-violet-200 dark:border-white/[0.1] shadow-sm"
                          : "bg-transparent text-slate-600 dark:text-purple-200/60 border-slate-200 dark:border-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.02]"
                      }`}
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

            {/* HeroUI Custom Separator component integration */}
            <Separator className="my-4 dark:bg-white/5" />

            {/* Emotional Tone Filter — Updated to HeroUI v3.1.0 Custom Subcomponents */}
            <div>
              <Select
                aria-label="Emotional Tone"
                selectedKeys={selectedToneKeys}
                onSelectionChange={setSelectedToneKeys}
              >
                <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">
                  Emotional Tone
                </Label>
                <Select.Trigger className="w-full flex items-center justify-between border dark:border-white/10 rounded-xl px-3 py-2 bg-white dark:bg-[#12032e]/50 h-11 text-sm text-slate-700 dark:text-purple-100">
                  <Select.Value />
                  <Select.Indicator>
                    <ChevronDown size={16} className="text-default-400" />
                  </Select.Indicator>
                </Select.Trigger>

                <Description className="text-[10px] text-default-400 mt-1 block">
                  Filter content mood
                </Description>

                <Select.Popover className="dark:bg-[#1a093c] border dark:border-white/10 rounded-xl shadow-xl mt-1 overflow-hidden p-1 min-w-[200px]">
                  <ListBox className="p-1 gap-1">
                    <ListBox.Item
                      key="All"
                      className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer text-slate-700 dark:text-purple-200"
                    >
                      <Label className="dark:text-white">All Tones</Label>
                    </ListBox.Item>

                    {/* ListBox.Section Implementation */}
                    <ListBox.Section className="pt-1">
                      {lessons.map((tone) => (
                        <ListBox.Item
                          key={tone._id}
                          textValue={tone.emotionalTone}
                          className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer text-slate-700 dark:text-purple-200"
                        >
                          <Label className="dark:text-white">
                            {tone.emotionalTone}
                          </Label>
                        </ListBox.Item>
                      ))}
                    </ListBox.Section>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-60 flex items-center justify-center"
              >
                <Spinner
                  color="secondary"
                  size="lg"
                  label="Loading lessons..."
                />
              </motion.div>
            ) : lessons.length > 0 ? (
              <motion.div
                key="grid"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-y-10"
              >
                {/* Lessons Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lessons.map((lesson) => (
                    <motion.div key={lesson._id} variants={itemVariants} layout>
                      <LessonCard
                        lesson={lesson}
                        userPlan={userPlan}
                        favorites={favorites}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-4 pb-10">
                    <Button
                      isIconOnly
                      variant="flat"
                      radius="xl"
                      disabled={currentPage === 1}
                      onClick={() =>
                        currentPage > 1 && handlePageChange(currentPage - 1)
                      }
                      className={`bg-violet-100 text-violet-600 dark:bg-white/[0.04] dark:text-purple-300 min-w-10 h-10 ${currentPage === 1 ? "opacity-40 cursor-not-allowed" : "hover:scale-105 active:scale-95"}`}
                    >
                      <ChevronLeft size={18} />
                    </Button>

                    {Array.from({ length: totalPages }, (_, index) => {
                      const pageNum = index + 1;
                      const isActive = currentPage === pageNum;
                      return (
                        <Button
                          key={pageNum}
                          radius="xl"
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 h-10 font-bold text-xs transition-all duration-300 ${isActive ? "bg-[#00e5b4] text-slate-950 shadow-md shadow-[#00e5b4]/30 font-black scale-105" : "bg-violet-50 text-slate-600 hover:bg-violet-100 dark:bg-white/[0.02] dark:text-purple-200/60 dark:hover:bg-white/[0.06]"}`}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}

                    <Button
                      isIconOnly
                      variant="flat"
                      radius="xl"
                      disabled={currentPage === totalPages}
                      onClick={() =>
                        currentPage < totalPages &&
                        handlePageChange(currentPage + 1)
                      }
                      className={`bg-violet-100 text-violet-600 dark:bg-white/[0.04] dark:text-purple-300 min-w-10 h-10 ${currentPage === totalPages ? "opacity-40 cursor-not-allowed" : "hover:scale-105 active:scale-95"}`}
                    >
                      <ChevronRight size={18} />
                    </Button>
                  </div>
                )}
              </motion.div>
            ) : (
              /* Empty State */
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
                    setTempSearch("");
                    setSearchQuery("");
                    setSelectedCategories([]);
                    setCurrentPage(1);
                    router.push(`?page=1`, { scroll: false });
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

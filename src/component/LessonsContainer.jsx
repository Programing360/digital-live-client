"use client";

import React, { useState, useEffect } from "react";

import { Button, Spinner } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LessonCard from "./LessonsCard";

export default function LessonsContainer() {
  // স্টেট ম্যানেজমেন্ট
  const [lessons, setLessons] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  console.log(lessons);
  // const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const itemsPerPage = 6; // প্রতি পেজে কয়টি কার্ড দেখাবেন
  console.log(itemsPerPage);
  // ব্যাকএন্ড থেকে ডাটা আনার ফাংশন
  const fetchLessons = async (page) => {
    try {
      setLoading(true);
      console.log(page);
      // ব্যাকএন্ডে page এবং limit কুয়েরি পাঠানো হচ্ছে
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/lessonsPage?page=${page}&limit=${itemsPerPage}`
      );
      const data = await res.json();
      console.log(data);
      setLessons(data.lessons|| []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching paginated data:", error);
    } finally {
      setLoading(false);
    }
  };

  // currentPage চেঞ্জ হলেই এই useEffect আবার রান করবে
  useEffect(() => {
    fetchLessons(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // পেজ চেঞ্জ হলে স্মুথলি স্ক্রোল করে উপরে নিয়ে যাবে
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  // লোডিং স্টেট
  if (loading) {
    return (
      <div className="w-full h-60 flex items-center justify-center">
        <Spinner color="secondary" size="lg" label="Loading lessons..." />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-y-10">
      {/* 🔮 কার্ডের গ্রিড এরিয়া */}
      {lessons.length === 0 ? (
        <p className="text-center text-default-400 mt-10">No lessons found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
      )}

      {/* 🎛️ সার্ভার-সাইড প্যাজিনেশন বাটন কন্ট্রোল */}
   
        <div className="flex items-center justify-center gap-2 mt-4 pb-10">
          {/* Previous Button */}
          <Button
            isIconOnly
            variant="flat"
            radius="xl"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`bg-violet-100 text-violet-600 dark:bg-white/[0.04] dark:text-purple-300 min-w-10 h-10 ${
              currentPage === 1 ? "opacity-40 cursor-not-allowed" : "hover:scale-105 active:scale-95"
            }`}
          >
            <ChevronLeft size={18} />
          </Button>

          {/* Dynamic Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNum = index + 1;
            const isActive = currentPage === pageNum;

            return (
              <Button
                key={pageNum}
                radius="xl"
                onClick={() => handlePageChange(pageNum)}
                className={`w-10 h-10 font-bold text-xs transition-all duration-300 ${
                  isActive
                    ? "bg-[#00e5b4] text-slate-950 shadow-md shadow-[#00e5b4]/30 font-black scale-105"
                    : "bg-violet-50 text-slate-600 hover:bg-violet-100 dark:bg-white/[0.02] dark:text-purple-200/60 dark:hover:bg-white/[0.06]"
                }`}
              >
                {pageNum}
              </Button>
            );
          })}

          {/* Next Button */}
          <Button
            isIconOnly
            variant="flat"
            radius="xl"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`bg-violet-100 text-violet-600 dark:bg-white/[0.04] dark:text-purple-300 min-w-10 h-10 ${
              currentPage === totalPages ? "opacity-40 cursor-not-allowed" : "hover:scale-105 active:scale-95"
            }`}
          >
            <ChevronRight size={18} />
          </Button>
        </div>

    </div>
  );
}
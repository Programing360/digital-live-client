"use client";
import React, { useState } from 'react';
import MyLessons from './MyLesson';
import { UpdateLessonModal } from '@/component/userDashboard/UpdateLessonModal';
import { toast } from 'react-toastify';

export default function MyLessonsDashboard({ lessonData, user }) {
  const [lessons, setLessons] = useState(lessonData || []);
  const [isPremiumUser] = useState(true); 
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleEditClick = (lesson) => {
    setSelectedLesson(lesson);
    setIsUpdateModalOpen(true);
  };

  // মডালে আপডেট সফল হলে এই ফাংশনটি প্যারেন্ট স্টেট আপডেট করবে
  const handleUpdateSuccess = (updatedData) => {
    setLessons(prevLessons => 
      prevLessons.map(lesson => 
        // MongoDB _id অথবা id উভয় ক্ষেত্রই হ্যান্ডেল করার জন্য ট্র্যাকিং
        (lesson._id === selectedLesson._id || lesson.id === selectedLesson._id) 
          ? { ...lesson, ...updatedData } 
          : lesson
      )
    );
    toast.success("UI State synchronized with cluster successfully.");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <MyLessons
        lessonsData={lessons} 
        isPremiumUser={isPremiumUser} 
        onEditAction={handleEditClick} 
      />

      <UpdateLessonModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedLesson(null);
        }}
        // এখানে lessons অ্যারে না পাঠিয়ে নির্বাচিত Object-টি পাঠানো হলো
        lessonData={selectedLesson}
        isPremiumUser={isPremiumUser}
        onUpdateSuccess={handleUpdateSuccess}
      />
    </div>
  );
}
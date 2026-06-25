"use client";
import React, { useState } from 'react';
import MyLessons from './MyLesson';
import { UpdateLessonModal } from '@/component/userDashboard/UpdateLessonModal';
import { toast } from 'react-toastify';

export default function MyLessonsDashboard({lessonData}) {

  const [lessons, setLessons] = useState(lessonData);


  const [isPremiumUser] = useState(true); 

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedLessonForUpdate, setSelectedLessonForUpdate] = useState(null);


  const handleEditClick = (lesson) => {
    setSelectedLessonForUpdate(lesson);
    setIsUpdateModalOpen(true);
  };


  const handleUpdateSuccess = (updatedData) => {
   
    setLessons(prevLessons => 
      prevLessons.map(lesson => 
        lesson.id === selectedLessonForUpdate.id ? { ...lesson, ...updatedData } : lesson
      )
    );


    toast.success("Lesson updated successfully to MongoDB Node!");
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
        onClose={() => setIsUpdateModalOpen(false)}
        lessonData={lessons}
        isPremiumUser={isPremiumUser}
        onUpdateSuccess={handleUpdateSuccess}
      />
    </div>
  );
}
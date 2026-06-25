"use client";
import React, { useState } from 'react';
import MyLessons from './MyLesson';
import { UpdateLessonModal } from '@/component/userDashboard/UpdateLessonModal';
import { toast } from 'react-toastify';

export default function MyLessonsDashboard({lessonData, user}) {

  const [lessons, setLessons] = useState(lessonData);

  console.log(lessonData);

  const [isPremiumUser] = useState(true); 

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // console.log(selectedLesson);

  const handleEditClick = (lesson) => {
    // console.log(lesson);
    setSelectedLesson(lesson);
    setIsUpdateModalOpen(true);
  };


  // const handleUpdateSuccess = (updatedData) => {
   
  //   setLessons(prevLessons => 
  //     prevLessons.map(lesson => 
  //       lesson.id === selectedLesson.id ? { ...lesson, ...updatedData } : lesson
  //     )
  //   );


  //   toast.success("Lesson updated successfully to MongoDB Node!");
  // };

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
        selectedLesson={selectedLesson}
        // onUpdateSuccess={handleUpdateSuccess}
      />
    </div>
  );
}
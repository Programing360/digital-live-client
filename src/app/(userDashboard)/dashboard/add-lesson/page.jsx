import AddLesson from '@/component/userDashboard/AddLesson';
import { getUseSession } from '@/lib/core/session';
import React from 'react';

const LessonAddPage = async() => {

  const user = await getUseSession()

  return (
    <div>
      <AddLesson user={user}></AddLesson>
    </div>
  );
};

export default LessonAddPage;
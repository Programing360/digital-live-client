import React from 'react';
import ManageUsersPage from './ManageUser';
import { allLessons } from '@/lib/api/lessons';
import { getAllUser } from '@/lib/api/user';

const managePage = async() => {

  const allLesson = await allLessons()
  const allUser = await getAllUser()

  return (
    <div>
      <ManageUsersPage allLessons={allLesson} allUser={allUser}></ManageUsersPage>
    </div>
  );
};

export default managePage;
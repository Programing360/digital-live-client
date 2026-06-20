import React from 'react';
import ProfileView from './ProfileView';
import { getUseSession } from '@/lib/core/session';

const ProfilePage =async () => {
   const user = await getUseSession()
  
  return (
    <div>
      <ProfileView user={user}></ProfileView>
    </div>
  );
};

export default ProfilePage;
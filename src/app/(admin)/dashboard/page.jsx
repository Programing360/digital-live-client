import DashboardHome from '@/component/userDashboard/DashboardHome';
import { getUseSession } from '@/lib/core/session';
import React from 'react';

const page = async() => {

  const user = await getUseSession()

  return (
    <div>
      <DashboardHome user={user}></DashboardHome>
    </div>
  );
};

export default page;
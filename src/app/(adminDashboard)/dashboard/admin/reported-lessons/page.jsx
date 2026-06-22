import React from 'react';
import ManageReportedPage from './ManageReportPage';
import { getAllReport } from '@/lib/api/manageReport';

const reportPage = async () => {

  const allReport = await getAllReport()

  return (
    <div>
      <ManageReportedPage allReport={allReport}></ManageReportedPage>
    </div>
  );
};

export default reportPage;
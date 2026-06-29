import React from 'react';
import ManageReportedPage from './ManageReportPage';
import { getAllReport } from '@/lib/api/manageReport';
export const metadata = {
  title: 'Reported-Lessons | Digital Life Lessons'
}
const reportPage = async () => {

  const allReport = await getAllReport()

  return (
    <div>
      <ManageReportedPage allReport={allReport}></ManageReportedPage>
    </div>
  );
};

export default reportPage;
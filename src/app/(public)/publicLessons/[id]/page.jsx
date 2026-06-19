import LessonDetailsPage from '@/component/LessionsDetailsPage';
import { getLessonsDetailsById } from '@/lib/api/lessons';
import React from 'react';

const lessionDetailsPage = async({params}) => {

    const {id} = await params
    const lessonData = await getLessonsDetailsById(id)

    // console.log(lessonData);

    return (
        <div>
            <LessonDetailsPage lessonData={lessonData}></LessonDetailsPage>
        </div>
    );
};

export default lessionDetailsPage;
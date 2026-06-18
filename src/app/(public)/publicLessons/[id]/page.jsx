import LessonDetailsPage from '@/component/LessionsDetailsPage';
import { getLessonsById } from '@/lib/api/lessons';
import React from 'react';

const lessionDetailsPage = async({params}) => {

    const {id} = await params

    console.log(id);

    const lessonData = await getLessonsById(id)

    console.log(lessonData);

    return (
        <div>
            <LessonDetailsPage lessonData={lessonData}></LessonDetailsPage>
        </div>
    );
};

export default lessionDetailsPage;
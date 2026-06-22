import React from 'react';
import AuthorLessons from './AuthorLessons';
import { allLessons, getLessonsDetailsById } from '@/lib/api/lessons';

const AuthorLessonPages = async({params}) => {

    const {id} = await params
    const allLesson = await allLessons()
    const {author} = await getLessonsDetailsById(id);

    const totalLessons = allLesson.filter(lesson => lesson.author.authorId === author.authorId)


    return (
        <div>
            <AuthorLessons totalLessons={totalLessons}></AuthorLessons>
        </div>
    );
};

export default AuthorLessonPages;
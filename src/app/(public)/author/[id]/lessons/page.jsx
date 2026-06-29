import React from 'react';
import AuthorLessons from './AuthorLessons';
import { allLessons, getLessonsDetailsById } from '@/lib/api/lessons';


export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const { id } = await params
 
  // fetch data
  const product = await getLessonsDetailsById(id)
 
  // optionally access and extend (rather than replace) parent metadata
//   const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product.title,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  }
}
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
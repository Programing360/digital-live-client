import { serverMutation } from "../core/server"

export const createLesson = async(lessonData) => {
    const res = await serverMutation('api/createLessons', lessonData)
    return res;
}
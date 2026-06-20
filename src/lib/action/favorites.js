import { serverDelete, serverMutation } from "../core/server"

export const createFavoritesLesson = async(fav) => {
    const res = await serverMutation('api/favorites/toggle', fav)
    return res
}

export const deleteFavoritesLesson = async(favId) => {
    const res = await serverDelete(`api/favDelete/${favId}`)
    return res
}
export const deleteLesson = async(lessId) => {
    const res = await serverDelete(`api/lessonDelete/${lessId}`)
    return res
}


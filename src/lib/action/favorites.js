import { serverDelete, serverMutation } from "../core/server"

export const createFavoritesLesson = async(fav) => {
    const res = await serverMutation('api/favorites/toggle', fav)
    return res
}

export const deleteFavoritesLesson = async(favId) => {
    const res = await serverDelete(`api/favDelete/${favId}`)
    return res
}


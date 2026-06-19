import { serverMutation } from "../core/server"

export const createFavoritesLesson = async(fav) => {
    const res = await serverMutation('api/favorites', fav)
    return res
}
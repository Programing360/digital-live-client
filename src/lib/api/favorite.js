import { serverFetchById } from "../core/server"




export const favoriteDataById = async(userId) => {
    const res = await serverFetchById(`api/favorites/${userId}`)
    return res
}
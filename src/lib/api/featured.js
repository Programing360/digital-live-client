import { serverFetch } from "../core/server"

export const getFeatured = async() => {
    const res = await serverFetch('api/featured')
    return res
}
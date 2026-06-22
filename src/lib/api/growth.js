import { serverFetch } from "../core/server"

export const getGrowthData = async() => {
    const res = await serverFetch('api/growth')
    return res
}
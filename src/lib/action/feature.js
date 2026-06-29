import { serverUpdate } from "../core/server"

export const addFeature = async(id, data) => {
    const res = await serverUpdate(`api/feature/${id}`)
    return res
}
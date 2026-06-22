import { serverMutation } from "../core/server"

export const userSubscription = async(data) => {
    const res = await serverMutation('api/subscription',data);
   return res
}
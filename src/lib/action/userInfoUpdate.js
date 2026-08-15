import { serverUpdate } from "../core/server"

export const userInfoUpdate = async (userId, updateData) => {
    try{
        const response = await serverUpdate(`api/user/update/${userId}`, updateData)
        console.log(response);
        return response
    }catch(error){
        console.error("Error updating user info:", error);
        throw error;
    }
}
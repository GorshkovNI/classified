import $api from "../../../http";

export default class UserAdService {
    // static async userProfileInfo(id: string){
    //     return $api.post(`profile/${id}`, {id})
    // }
    static async userProfileInfo(id: string){
        return $api.get(`profile/${id}`, )
    }

}
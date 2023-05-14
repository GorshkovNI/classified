import $api from "../../../http";

export default class UserAdService {
    // static async userProfileInfo(id: string){
    //     return $api.post(`profile/${id}`, {id})
    // }
    static async userProfileInfo(id){
        return $api.get(`profile/${id}`, )
    }

    static async deleteAd(categoryId, ads_id){
        return $api.post('add-item/deleteAd',{categoryId, ads_id})
    }

}
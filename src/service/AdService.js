import $api from '../http/index'

export default class AdService{
    static async getTypes(type){
        return $api.get('add-item/getTypes')
    }
}
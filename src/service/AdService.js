import $api from '../http/index'

export default class AdService{
    static async getTypes(type){
        return $api.get('add-item/getTypes')
    }

    static async getFieldsCategory(category){
        return $api.post('add-item/getFieldsType', {category})
    }

    static async createNewAdd(data){
        return $api.post('add-item/addItem', {data})
    }

    static async getCurrentAd(id){
        return $api.post(`item/${id}`, {id} )
    }

    static async getAdByCity(city){
        return $api.post('search/adsByCity', {city})
    }

}
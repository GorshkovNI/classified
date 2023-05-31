import $api from '../http/index'

export default class SearchService{
    static async searchAd(text){
        return $api.post('search', {text})
    }

    static async searchCar(city){
        return $api.post('search/transport', {city})
    }

    static async searchRent(city){
        return $api.post('search/rent', {city})
    }

    static async searchWork(city){
        return $api.post('search/work', {city})
    }


}
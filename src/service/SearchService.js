import $api from '../http/index'

export default class SearchService{
    static async searchAd(text){
        return $api.post('search', {text})
    }



}
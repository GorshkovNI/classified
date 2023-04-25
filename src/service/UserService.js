import $api from '../http/index'

export default class UserService{
    static async fetchUser(){
        return $api.get('api/users')
    }
}
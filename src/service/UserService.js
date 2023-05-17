import $api from '../http/index'

export default class UserService{
    static async fetchUser(){
        return $api.get('api/users')
    }

    static async changeAvatar(avatar, user_id){
        return $api.post('api/changeAvatar', {avatar, user_id})
    }

}
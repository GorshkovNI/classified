import $api from '../http/index'

export default class AuthService{
    static async login(email, password){
        return $api.post('api/login', {email, password})
    }

    static async registration(name, email, phone, password, dateRegistration){
        return $api.post('api/registration', {name, email, phone, password, dateRegistration})
    }

    static async logout(token){
        return $api.post('api/logout', {token})
    }
}
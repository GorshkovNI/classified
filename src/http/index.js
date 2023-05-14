import axios from 'axios'
import async from "async";
//export const API_URL = `http://localhost:8080/`
export const API_URL = 'https://getit.herokuapp.com/'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use(config => {
    return config
},
   async (error)=>{
        const originalRequest = error.config
        if(error.response.status == 401 && error.config._isRetry){
            originalRequest._isRetry = true
            try {
                const res = await axios.get(`${API_URL}api/refresh`, {withCredentials: true})
                localStorage.setItem('token', res.data.accessToken)
                return $api.request(originalRequest)
            }
            catch (e){
                console.log('не авторизован')
            }

        }
        throw error
    })

export default $api;
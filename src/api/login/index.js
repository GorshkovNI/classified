import { axiosInstance } from "../instance";
import {Endpoints} from "../endpoints";

export const login = (params) => {
    axiosInstance.post(Endpoints.AUTH.LOGIN, params)
}
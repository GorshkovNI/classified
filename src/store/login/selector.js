import {loginFailure, loginStart, loginSucces} from "./sliceLogin";
import {api} from "../../api/api";
import axios from "axios";

export const loginUser =
    (data) =>
        async (dispatch) => {
            try {
                dispatch(loginStart())

                const res = await api.login.login(data)
                console.log(res)
                dispatch(loginSucces(res.data.accessToken))

            } catch (e) {
                console.error(e)
                dispatch(loginFailure(e.message))
            }
}


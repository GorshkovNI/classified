import {Action, createAsyncThunk, createSlice, Dispatch, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import AdService from "../../../service/AdService";
import {log} from "util";


export interface IState {
    id: string

    info:{
        [key: string]: any,
    }

    // title: string,
    // price: any,
    // description: string,
    // city: string,
    // photos: any,

    category: string,
    fields: any,

    user: {
        nameSeller: string,
        idSeller: string,
        dateRegistration:string,
        photo: string
    }

    isLoadingPicture: boolean,
    isLoading: boolean,
}

const initialState: IState = {
    id: '',

    info:{

    },

    // title: '',
    // price: '',
    // description: '',
    // city: '',
    // photos: [],

    category: '',
    fields: [],

    user: {
        nameSeller: '',
        idSeller: '',
        dateRegistration:'',
        photo: ''
    },

isLoadingPicture: false,
isLoading: false,
}

const product = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setProduct: (state: IState, action) => {
            console.log(action.payload)
            // state.title = action.payload.title
            // state.price = action.payload.price
            // state.description = action.payload.description
            // state.city = action.payload.city
            state.info = {...action.payload}
        },

        setUser: (state: IState, action) => {
            state.user.nameSeller = action.payload.name
            state.user.idSeller = action.payload._id
            state.user.dateRegistration = action.payload.dateRegistration
            state.user.photo = action.payload.photo
        },

        setCategory: (state: IState, action) => {
            state.category = action.payload.category
            state.fields = action.payload.fields
        },

        setPhoto: (state: IState, action) => {
            state.info.photos = action.payload
        },

        fetchingDataStart: (state: IState) => {
            state.isLoading = true
        },

        fetchingDataFinished: (state: IState) => {
            state.isLoading = false
        },
        fetchingPhotoStart: (state: IState) => {
            state.isLoadingPicture = true
        },
        fetchingPhotoSucces: (state: IState) => {
            state.isLoadingPicture = false
        }
    }
})


export const fetchProductById = createAsyncThunk(
    'product/getProductById',
    async (id: string, {dispatch}) => {
        dispatch(fetchingDataStart())
        const response = await AdService.getCurrentAd(id)
        console.log(response)
        const data = response.data.currentAd
        const user = response.data.user
        const category = response.data.categoryName
        dispatch(setProduct(data))
        dispatch(setUser(user))
        dispatch(setCategory(category))
        dispatch(setPhoto(response.data.currentAd.photos))
        dispatch(fetchingDataFinished())
        return response.data
    }
)


export const { setProduct, setUser, setCategory, setPhoto, fetchingDataStart, fetchingDataFinished, fetchingPhotoStart, fetchingPhotoSucces } = product.actions
export default product.reducer
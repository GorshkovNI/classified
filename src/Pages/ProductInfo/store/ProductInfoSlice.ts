import {Action, createAsyncThunk, createSlice, Dispatch, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import AdService from "../../../service/AdService";
import {log} from "util";


export interface IState {
    id: string
    nameSeller: string,
    idSeller: string,
    dateRegistration: string,

    price: number,
    productName: string,
    marka: string,
    model: string,
    year: string,
    registrationnumber: string,
    vin: string,
    color: string,
    mileage: string,
    owners: string,
    isCrash: string,
    city: string,
    description: string,
    characteristic: string,
    isLoading: boolean,
    photos: string[],
    category: string,
    isLoadingPicture: boolean
}

const initialState: IState = {
    id: '',
    nameSeller: '',
    idSeller: '',
    dateRegistration: '',

    price: 0,
    productName: '',
    marka: '',
    model: '',
    year: '',
    registrationnumber: '',
    vin: '',
    color: '',
    mileage: '',
    owners:'',
    isCrash: '',
    description: '',
    characteristic: '',
    city: '',
    isLoading: false,
    photos: [],
    category: '',
    isLoadingPicture: false
}

const product = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setProduct: (state: IState, action) => {
            console.log(action.payload)
            state.productName = action.payload.title
            state.price = action.payload.price
            state.year = action.payload.year
            state.marka = action.payload.marka
            state.model = action.payload.model
            state.color = action.payload.color
            state.registrationnumber = action.payload.registrationnumber
            state.vin = action.payload.vin
            state.mileage = action.payload.mileage
            state.owners = action.payload.owners
            state.isCrash = action.payload.isCrash
            state.description = action.payload.description
            state.city = action.payload.city
        },

        setUser: (state: IState, action) => {
            state.nameSeller = action.payload.name
            state.idSeller = action.payload._id
            state.dateRegistration = action.payload.dateRegistration
        },

        setCategory: (state: IState, action) => {
            state.category = action.payload.category
        },

        setPhoto: (state: IState, action) => {
            console.log(action)
            state.photos = action.payload
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
import {Action, createAsyncThunk, createSlice, Dispatch, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import AdService from "../../../service/AdService";
import {log} from "util";


export interface IState {
    id: string
    nameSeller: string,
    price: number,
    productName: string,
    characteristic: string,
    isLoading: boolean,
    photos: string[],
    category: string
}

const initialState: IState = {
    id: '',
    nameSeller: '',
    price: 0,
    productName: '',
    characteristic: '',
    isLoading: false,
    photos: [],
    category: ''
}

const product = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setProduct: (state, action) => {
            console.log(action.payload)
            state.productName = action.payload.title
            state.price = action.payload.price
        },

        fetchingDataStart: (state: IState) => {
            state.isLoading = true
        },

        fetchingDataFinished: (state: IState) => {
            state.isLoading = false
        },

        setUser: (state, action) => {
            state.nameSeller = action.payload.name
        },

        setCategory: (state, action) => {
            state.category = action.payload.category
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
        dispatch(fetchingDataFinished())
        return response.data
    }
)

export const { setProduct, setUser, setCategory, fetchingDataStart, fetchingDataFinished } = product.actions
export default product.reducer
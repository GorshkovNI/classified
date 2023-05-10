import {IState} from "./ProductInfoSlice";

export const getName = (state) => state.product.nameSeller
export const getState = (state): IState => state.product
export const getIsLoading = (state): IState => state.product.isLoading
export const getIsLoadingPhoto = (state): IState => state.product.isLoadingPicture
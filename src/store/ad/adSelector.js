import { createSelector } from "@reduxjs/toolkit";

export const getAllCategories = (state) => state.ad.categories
export const getAllFieldsCategory = (state) => state.ad.fields
export const getLoadingAd = (state) => state.ad.isAdLoading
export const getRedirect = (state) => state.ad.isRedirect
export const getError = (state) => state.ad.isError
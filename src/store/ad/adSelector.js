import { createSelector } from "@reduxjs/toolkit";

export const getAllCategories = (state) => state.ad.categories
export const getAllFieldsCategory = (state) => state.ad.fields
export const isLoadingAd = (state) => state.ad.isAdLoading
import { createSelector } from "@reduxjs/toolkit";
export var getAllCategories = function (state) { return state.ad.categories; };
export var getAllFieldsCategory = function (state) { return state.ad.fields; };
export var getLoadingAd = function (state) { return state.ad.isAdLoading; };
export var getRedirect = function (state) { return state.ad.isRedirect; };
export var getError = function (state) { return state.ad.isError; };

import { createSelector } from "@reduxjs/toolkit";

export const getIsAuth = (state) => state.user.isAuth
export const getIsLoading = (state) => state.user.isLoading
import { createSelector } from "@reduxjs/toolkit";

export const getIsAuth = (state) => state.user.isAuth
export const getIsLoading = (state) => state.user.isLoading
export const getUserName = (state) => state.user.userData.name
export const getInvalidLogging = (state) => state.user.invalidLogging
export const serverError = (state) => state.user.serverError
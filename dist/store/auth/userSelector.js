import { createSelector } from "@reduxjs/toolkit";
export var getIsAuth = function (state) { return state.user.isAuth; };
export var getIsLoading = function (state) { return state.user.isLoading; };
export var getUserName = function (state) { return state.user.userData.name; };
export var getInvalidLogging = function (state) { return state.user.invalidLogging; };
export var serverError = function (state) { return state.user.serverError; };

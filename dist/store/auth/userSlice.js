var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
import { createSlice } from "@reduxjs/toolkit";
import AuthService from "../../service/AuthService";
import axios from "axios";
import { API_URL } from "../../http";
var initialState = {
    userData: {
        name: localStorage.getItem('name') | 'User'
    },
    isAuth: false,
    isLoading: false,
    invalidLogging: false,
    serverError: false
};
var user = createSlice({
    name: 'userSlice',
    initialState: initialState,
    reducers: {
        setAuth: function (state) {
            state.isAuth = true;
        },
        removeAuth: function (state) {
            state.isAuth = false;
        },
        setInvalidLogging: function (state) {
            state.invalidLogging = true;
        },
        removeInvalidLogging: function (state) {
            state.invalidLogging = false;
        },
        setDataUser: function (state, action) {
            state.userData.name = action.payload;
            localStorage.setItem('name', action.payload);
        },
        fetchDataStart: function (state) {
            state.isLoading = true;
        },
        fetchDataSuccess: function (state) {
            state.isLoading = false;
        },
        fetchDataError: function (state) {
            state.isLoading = false;
            state.invalidLogging = true;
        },
    }
});
export var login = function (email, password) { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var response, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                dispatch(fetchDataStart());
                console.log('начал логинитсья');
                return [4 /*yield*/, AuthService.login(email, password)];
            case 1:
                response = _a.sent();
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('user_id', response.data.user['_id']);
                dispatch(setAuth());
                dispatch(setDataUser(response.data.user.name));
                dispatch(fetchDataSuccess());
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                dispatch(fetchDataError());
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }; };
export var registration = function (name, email, phone, password) { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var dateRegistration, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                dispatch(fetchDataStart());
                dateRegistration = new Date().getFullYear();
                console.log(typeof dateRegistration);
                return [4 /*yield*/, AuthService.registration(name, email, phone, password, dateRegistration)];
            case 1:
                response = _a.sent();
                localStorage.setItem('token', response.data.accessToken);
                // dispatch(setAuth())
                // dispatch(setDataUser(response.data.user.name))
                dispatch(fetchDataSuccess());
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }; };
export var logout = function () { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                refreshToken = localStorage.getItem('token');
                return [4 /*yield*/, AuthService.logout(refreshToken)];
            case 1:
                response = _a.sent();
                localStorage.removeItem('token');
                localStorage.removeItem('name');
                localStorage.removeItem('user_id');
                dispatch(removeAuth());
                return [2 /*return*/];
        }
    });
}); }; };
export var checkAuth = function () { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var res, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                dispatch(fetchDataStart());
                console.log('ЗАПУЩЕН CHECKAUTH');
                return [4 /*yield*/, axios.get("".concat(API_URL, "api/refresh"), { withCredentials: true })];
            case 1:
                res = _a.sent();
                console.log(res);
                localStorage.setItem('token', res.data.accessToken);
                dispatch(setAuth());
                dispatch(setDataUser(res.data.user.name));
                dispatch(fetchDataSuccess());
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                console.log('Ошибка при проверке авторизации');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }; };
export var setAuth = (_a = user.actions, _a.setAuth), removeAuth = _a.removeAuth, fetchDataStart = _a.fetchDataStart, fetchDataSuccess = _a.fetchDataSuccess, setDataUser = _a.setDataUser, setInvalidLogging = _a.setInvalidLogging, removeInvalidLogging = _a.removeInvalidLogging, fetchDataError = _a.fetchDataError;
export default user.reducer;

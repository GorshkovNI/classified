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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
import { createSlice } from "@reduxjs/toolkit";
import { fetchDataStart, fetchDataSuccess } from "../auth/userSlice";
import AdService from "../../service/AdService";
var initialState = {
    type: '',
    isAdLoading: false,
    isError: false,
    categories: [],
    fields: [],
    isRedirect: false
};
var ad = createSlice({
    name: 'adSlice',
    initialState: initialState,
    reducers: {
        fetchAdDataStart: function (state) {
            state.isAdLoading = true;
        },
        fetchAdDataSuccess: function (state) {
            state.isAdLoading = false;
        },
        fetchAdDataError: function (state) {
            state.isAdLoading = false;
        },
        setType: function (state, action) {
            state.type = action.payload;
        },
        setCategories: function (state, action) {
            state.categories = __spreadArray([], action.payload, true);
        },
        setFields: function (state, action) {
            console.log(action);
            state.fields = __spreadArray([], action.payload, true);
        },
        setError: function (state) {
            state.isError = true;
        },
        removeError: function (state) {
            state.isError = false;
        },
        setRedirect: function (state) {
            state.isRedirect = true;
        },
        removeRedirect: function (state) {
            state.isRedirect = false;
        }
    }
});
export var getCategories = function () { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var response, category, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                dispatch(fetchAdDataStart());
                return [4 /*yield*/, AdService.getTypes()];
            case 1:
                response = _a.sent();
                category = response.data.map(function (item) {
                    return {
                        category: item.category,
                        translate: item.translate
                    };
                });
                dispatch(setCategories(category));
                dispatch(fetchAdDataSuccess());
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }; };
export var getCategoryFields = function (category) { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var response, e_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                dispatch(fetchAdDataStart());
                return [4 /*yield*/, AdService.getFieldsCategory(category)];
            case 1:
                response = _b.sent();
                if (((_a = response.data.fields) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                    dispatch(fetchDataSuccess());
                    return [2 /*return*/];
                }
                dispatch(setFields(response.data.fields));
                dispatch(fetchAdDataSuccess());
                return [3 /*break*/, 3];
            case 2:
                e_2 = _b.sent();
                console.log(e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }; };
export var createNewAdd = function (data) { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var response, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                dispatch(fetchAdDataStart());
                return [4 /*yield*/, AdService.createNewAdd(data)];
            case 1:
                response = _a.sent();
                console.log(response);
                dispatch(fetchAdDataSuccess());
                dispatch(setRedirect());
                setTimeout(function () {
                    dispatch(removeRedirect());
                }, 1000);
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                dispatch(setError());
                console.log(e_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }; };
export var fetchAdDataStart = (_a = ad.actions, _a.fetchAdDataStart), fetchAdDataSuccess = _a.fetchAdDataSuccess, setType = _a.setType, setCategories = _a.setCategories, setFields = _a.setFields, setError = _a.setError, removeError = _a.removeError, setRedirect = _a.setRedirect, removeRedirect = _a.removeRedirect, fetchAdDataError = _a.fetchAdDataError;
export default ad.reducer;

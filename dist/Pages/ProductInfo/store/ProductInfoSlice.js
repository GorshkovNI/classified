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
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdService from "../../../service/AdService";
var initialState = {
    id: '',
    nameSeller: '',
    idSeller: '',
    dateRegistration: '',
    price: 0,
    productName: '',
    marka: '',
    model: '',
    year: '',
    registrationnumber: '',
    vin: '',
    color: '',
    mileage: '',
    owners: '',
    isCrash: '',
    description: '',
    characteristic: '',
    city: '',
    isLoading: false,
    photos: [],
    category: '',
    isLoadingPicture: false
};
var product = createSlice({
    name: 'productSlice',
    initialState: initialState,
    reducers: {
        setProduct: function (state, action) {
            console.log(action.payload);
            state.productName = action.payload.title;
            state.price = action.payload.price;
            state.year = action.payload.year;
            state.marka = action.payload.marka;
            state.model = action.payload.model;
            state.color = action.payload.color;
            state.registrationnumber = action.payload.registrationnumber;
            state.vin = action.payload.vin;
            state.mileage = action.payload.mileage;
            state.owners = action.payload.owners;
            state.isCrash = action.payload.isCrash;
            state.description = action.payload.description;
            state.city = action.payload.city;
        },
        setUser: function (state, action) {
            state.nameSeller = action.payload.name;
            state.idSeller = action.payload._id;
            state.dateRegistration = action.payload.dateRegistration;
        },
        setCategory: function (state, action) {
            state.category = action.payload.category;
        },
        setPhoto: function (state, action) {
            console.log(action);
            state.photos = action.payload;
        },
        fetchingDataStart: function (state) {
            state.isLoading = true;
        },
        fetchingDataFinished: function (state) {
            state.isLoading = false;
        },
        fetchingPhotoStart: function (state) {
            state.isLoadingPicture = true;
        },
        fetchingPhotoSucces: function (state) {
            state.isLoadingPicture = false;
        }
    }
});
export var fetchProductById = createAsyncThunk('product/getProductById', function (id, _a) {
    var dispatch = _a.dispatch;
    return __awaiter(void 0, void 0, void 0, function () {
        var response, data, user, category;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dispatch(fetchingDataStart());
                    return [4 /*yield*/, AdService.getCurrentAd(id)];
                case 1:
                    response = _b.sent();
                    console.log(response);
                    data = response.data.currentAd;
                    user = response.data.user;
                    category = response.data.categoryName;
                    dispatch(setProduct(data));
                    dispatch(setUser(user));
                    dispatch(setCategory(category));
                    dispatch(setPhoto(response.data.currentAd.photos));
                    dispatch(fetchingDataFinished());
                    return [2 /*return*/, response.data];
            }
        });
    });
});
export var setProduct = (_a = product.actions, _a.setProduct), setUser = _a.setUser, setCategory = _a.setCategory, setPhoto = _a.setPhoto, fetchingDataStart = _a.fetchingDataStart, fetchingDataFinished = _a.fetchingDataFinished, fetchingPhotoStart = _a.fetchingPhotoStart, fetchingPhotoSucces = _a.fetchingPhotoSucces;
export default product.reducer;

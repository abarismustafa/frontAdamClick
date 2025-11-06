import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

import { bannerApi } from "./home/banner/bannerSlice";
import productListSlice, { productsApi } from "./products/productSlice";

const persistConfig = {
    key: 'root',
    storage,
  }

const rootReducer = combineReducers({
    [productsApi.reducerPath]: productsApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    productList: productListSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
          }).concat(productsApi.middleware, bannerApi.middleware)
    },
    
});

export const persistor = persistStore(store)
// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { bannerApi } from "./home/banner/bannerSlice";
// import { productsApi } from "./products/productSlice";


// export const store = configureStore({
//     reducer: {
//         [productsApi.reducerPath]: productsApi.reducer
//     },
//     middleware: (getDefaultMiddleware) => {
//         return getDefaultMiddleware().concat(productsApi.middleware)
//     },
    
// });
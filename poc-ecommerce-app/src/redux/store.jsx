import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from './slices/cartSlice'
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session"; // Uses sessionStorage instead of localStorage

// Persist config
const persistConfig = {
  key: "root",
  storage: storageSession, // Stores data in sessionStorage
};

// Wrap reducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedCartReducer = persistReducer(persistConfig, cartReducer);


export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: persistedCartReducer,
  },
});

export const persistor = persistStore(store);

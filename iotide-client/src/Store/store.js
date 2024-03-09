import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";

//define key for persisted store and storage engine i.e localStorage
const persistConfig = {
  key: "root",
  storage,
};

//combines all reducers
const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
});

//persistReducer function allows state to be persisted
const persistedReducer = persistReducer(persistConfig, rootReducer);

//configure store and export store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});


//persistStore persists and rehydrates the store
export const persistor = persistStore(store);

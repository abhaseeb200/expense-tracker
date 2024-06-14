import { combineReducers, createStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "../feature/auth/userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  auth: userSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

export { store, persistor };

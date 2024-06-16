import { combineReducers, createStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "../feature/auth/userSlice";
import transactionSlice from "../feature/transaction/transactionSlice";
import categorySlice from "../feature/category/categorySlice";
import budgetSlice from "../feature/budget/budgetSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  auth: userSlice,
  transaction: transactionSlice,
  category: categorySlice,
  budget: budgetSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

export { store, persistor };

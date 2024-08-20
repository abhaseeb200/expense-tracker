import { combineReducers, createStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice, { logoutReducer } from "../feature/auth/userSlice";
import categorySlice from "../feature/category/categorySlice";
import budgetSlice from "../feature/budget/budgetSlice";
import themeSlice from "../feature/themeMode/themeSlice";
import transactionSlice from "../feature/transaction/transactionSlice";
import sourceSlice from "../feature/source-transaction/sourceSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  auth: userSlice,
  category: categorySlice,
  budget: budgetSlice,
  transaction: transactionSlice,
  source: sourceSlice,
  themeMode: themeSlice,
});

const rootReducer = (state, action) => {
  if (action.type === logoutReducer.type) {
    state = {
      themeMode: state.themeMode,
    };
  }
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

export { store, persistor };

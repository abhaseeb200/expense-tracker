import { combineReducers, createStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice, { logoutReducer } from "../feature/auth/userSlice";
import categorySlice from "../feature/category/categorySlice";
import budgetSlice from "../feature/budget/budgetSlice";
import themeSlice from "../feature/themeMode/themeSlice";
import expenseSlice from "../feature/expense/expenseSlice";
import transactionSlice from "../feature/transaction/transactionSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  auth: userSlice,
  expense: expenseSlice,
  category: categorySlice,
  budget: budgetSlice,
  transaction: transactionSlice,
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

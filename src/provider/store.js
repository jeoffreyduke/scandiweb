import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { globalReducer } from "./globalSlice";
import pdpSlice from "./pdpSlice";
import appSlice from "./appSlice";
import csSlice from "./csSlice";
import { pIdReducer } from "./pIdSlice";
import cartSlice from "./cartSlice";
import counterSlice from "./counterSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const rootReducer = combineReducers({
  globalReducer,
  appSlice,
  csSlice,
  pdpSlice,
  pIdReducer,
  cartSlice,
  counterSlice,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    version: 0,
    stateReconciler: autoMergeLevel2,
  },
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

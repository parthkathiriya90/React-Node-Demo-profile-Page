import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import persistedReducer from "./rootReducer";
import thunk from "redux-thunk";
import fetchUserMiddleware from "../middleware/getUserData";

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, fetchUserMiddleware),
});

const persistor = persistStore(store);

export { store, persistor };

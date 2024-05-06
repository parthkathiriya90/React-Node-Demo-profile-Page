// rootReducer.js
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "../features/crud/userSlice";
import profileSlice from "../features/Profile/profileSlice";

// Configuration for Redux Persist
const persistConfig = {
  key: "REACT_REDUX_CRUD_DEMO",
  storage,
};

// Combine your reducers
const rootReducer = combineReducers({
  user: userSlice,
  profile: profileSlice,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;

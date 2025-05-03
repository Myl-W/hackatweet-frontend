import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import msgReducer from "../reducer/msg";
import loginReducer from "../reducer/login";
import registerReducer from "../reducer/register";
import userAccessReducer from "../reducer/userAccess";

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  userAccess: userAccessReducer,
  msg: msgReducer,
});

const persistConfig = {
  key: "HackaTweet",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
}

export const store = makeStore();
export const persistor = persistStore(store);

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";
import rootSaga from "./sagas";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./slices";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () => {
  const createdStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(middleware),
    devTools: process.env.NODE_ENV !== "production",
  });
  // Enable persistence
  createdStore.__persistor = persistStore(createdStore);
  sagaMiddleware.run(rootSaga);
  return createdStore;
};

const store = makeStore();

export const wrapper = createWrapper(() => store, { debug: true });
export { store };

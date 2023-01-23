import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import {authReducer} from './slice/authSlice';
import errorSlice from './slice/errorSlice';
import loaderSlice from './slice/loaderSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

// redux persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
};

// redux store, combine reducers
export const store = configureStore({
  reducer: {
    auth: authReducer(persistConfig),
    loader: loaderSlice,
    error: errorSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persist store with AsyncStorage
export const persist = persistStore(store);

// state and app dispatch used in hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
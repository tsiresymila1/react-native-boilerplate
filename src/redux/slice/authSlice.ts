import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PersistConfig, persistReducer} from 'redux-persist';
import {AuthState} from '../../@types';
const initialState: AuthState = {
  user: null,
  token: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state = {
        user: null,
        token: undefined,
      };
      return state;
    },
    refresh: (state, action: PayloadAction<AuthState>) => {
      state = action.payload;
      return state;
    },
    logged: (state, action: PayloadAction<AuthState>) => {
      state = action.payload;
      return state;
    },
  },
});
export const {logout, logged, refresh} = authSlice.actions;
export default authSlice.reducer;

export const authReducer = (
  persistConfig: PersistConfig<AuthState, any, any, any>,
) => persistReducer(persistConfig, authSlice.reducer);

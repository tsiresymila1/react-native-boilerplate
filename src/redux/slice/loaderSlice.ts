import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoaderState {
  isLoading: boolean;
  loaded: number;
}

const initialState: LoaderState = {
  isLoading: false,
  loaded: 0
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    toggleLoader: (state, action: PayloadAction<LoaderState>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { toggleLoader } = loaderSlice.actions;
export default loaderSlice.reducer;

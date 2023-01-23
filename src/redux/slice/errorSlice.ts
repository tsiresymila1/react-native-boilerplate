import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ErrorState {
    message?: string
  }

  const initialState: ErrorState = {
    message: undefined,
  }

  export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
      showError: (state, action: PayloadAction<{message: any, date: any}>) => {
        state.message = JSON.stringify(action.payload.message)
        return state
      },
      hideError: (state) => {
        state.message = undefined;
        return state
      },
    
    },
  })
  
  export const { showError, hideError } = errorSlice.actions
  export default errorSlice.reducer
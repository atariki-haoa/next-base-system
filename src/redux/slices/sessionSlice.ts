/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/interfaces/User';

interface SessionState {
  user: IUser | null;
}

const initialState: SessionState = {
  user: null,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload; // Directamente modificamos el estado gracias a immer
    },
    logout: (state) => {
      state.user = null; // Reseteamos el usuario a null
    },
  },
});

export const { login, logout } = sessionSlice.actions;

export default sessionSlice.reducer;

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
      const newState = { ...state };
      newState.user = action.payload;
    },
    logout: () => initialState,
  },
});

export const { login, logout } = sessionSlice.actions;

export default sessionSlice.reducer;

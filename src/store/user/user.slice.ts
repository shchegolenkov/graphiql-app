import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UserState {
  email: string | null | undefined;
  id: string | null | undefined;
}

const initialState: UserState = {
  email: null,
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user;
export const selectUserEmail = (state: RootState) => selectUser(state).email;
export const selectUserId = (state: RootState) => selectUser(state).id;

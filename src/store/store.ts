import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user.slice';
import modalReducer from './modal/modal.slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

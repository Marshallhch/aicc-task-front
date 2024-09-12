import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import modalReducer from './slices/modalSlice';
import apiReducer from './slices/apiSlice';

const store = configureStore({
  // 5. store에 slide 등록
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    api: apiReducer,
  },
});

export default store;

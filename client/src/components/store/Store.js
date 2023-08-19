import { configureStore } from '@reduxjs/toolkit';
import imageReducer from "./ImageSlice.js";

const store = configureStore({
  reducer: {
    image: imageReducer,
  },
});

export default store;
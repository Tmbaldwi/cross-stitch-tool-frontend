import { configureStore } from '@reduxjs/toolkit';
import colorReducer from './slices/colorSlice';
import imageReducer from './slices/imageSlice';

const store = configureStore({
    reducer: {
        color: colorReducer,
        image: imageReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
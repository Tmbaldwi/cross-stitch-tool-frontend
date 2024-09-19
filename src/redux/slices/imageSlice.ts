import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImageState {
    imageSrc: string | undefined;
}

const initialState: ImageState = {
    imageSrc: undefined,
};

const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        setImageSrc: (state, action: PayloadAction<string>) => {
            state.imageSrc = action.payload;
        },
        clearImageSrc: (state) => {
            state.imageSrc = undefined;
        },
    }
})

export const {setImageSrc, clearImageSrc} = imageSlice.actions;
export default imageSlice.reducer;
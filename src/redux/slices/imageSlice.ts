import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImageState {
    imageSrc: string | undefined;
    imageSizeSuggestions: string[][] | undefined;
}

const initialState: ImageState = {
    imageSrc: undefined,
    imageSizeSuggestions: undefined,
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
        setImageSizeSuggestions: (state, action: PayloadAction<string[][]>) => {
            state.imageSizeSuggestions = action.payload;
        },
        clearImageSizeSuggestions: (state) => {
            state.imageSizeSuggestions = undefined;
        }
    }
})

export const {setImageSrc, clearImageSrc, setImageSizeSuggestions, clearImageSizeSuggestions} = imageSlice.actions;
export default imageSlice.reducer;
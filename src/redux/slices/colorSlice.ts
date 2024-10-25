import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Palette, ColorOption } from '../../models/PaletteModels';

interface ColorState {
    colorPalette: string[];
    colorOptions: { [key: string]: ColorOption[]};
    colorSelection: { [key: string]: string};
}

const initialState: ColorState = {
    colorPalette: [],
    colorOptions: {},
    colorSelection: {},
};

const colorSlice = createSlice({
    name: 'color',
    initialState,
    reducers: {
        setColorPalette: (state, action: PayloadAction<string[]>) => {
            const newPalette: string[] = action.payload;

            // Set color palette
            state.colorPalette = newPalette;
            newPalette.forEach(color => {
                // add as default color selection
                state.colorSelection[color] = color;

                // add to color options
                //state.colorOptions[color] = ["#43A5BE", "#F5C26B", "#4FB06D", "#F07857", "#BF2C34"]; //TODO remove eventually
            });
        },
        clearColorPalette: (state) => {
            state.colorPalette = [];
        },
        setColorOptions: (state, action: PayloadAction<Palette>) => {
            const palette: Palette = action.payload;

            state.colorOptions[palette.originalColor] = palette.colorOptions;
        },
        setColorSelection: (state, action: PayloadAction<{ paletteColor: string; newSelection: string}>) => {
            const {paletteColor, newSelection} = action.payload;

            state.colorSelection[paletteColor] = newSelection;
        },
        resetAllColorSelections: (state) => {
            // reset to default
            state.colorPalette.forEach((color) => {
                state.colorSelection[color] = color;
            })
        },
    }
})

export const { setColorPalette, clearColorPalette, setColorOptions, setColorSelection, resetAllColorSelections } = colorSlice.actions;
export default colorSlice.reducer;
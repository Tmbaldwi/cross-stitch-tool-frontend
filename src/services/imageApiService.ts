import axios from 'axios';
import { ColorPaletteResponse } from '../models/PaletteModels'

const API_URL = 'http://localhost:8000/api/image/';

export const uploadImage = async (imageFile: File): Promise<string> => {
    const payload = new FormData();
    payload.append('file', imageFile);
    
    const response = await axios.post(`${API_URL}upload/`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });

    console.log(response.data)
    
    return response.data.image;
};

export const getColorPalette = async (): Promise<ColorPaletteResponse> => {
    const response = await axios.get(`${API_URL}palette/`);

    const { color_palette, color_palette_details }: ColorPaletteResponse = response.data;

    return {color_palette, color_palette_details};
}

export const swapColorsService = async (originalColor: string, newColor: string): Promise<string> => {
    const payload = {
        originalColor: originalColor,
        newColor: newColor
    }

    const response = await axios.post(`${API_URL}swapColors/`, payload);

    return response.data.image;
}

export const resetImage = async (): Promise<string> => {
    const response = await axios.post(`${API_URL}reset/`);

    return response.data.image;
}

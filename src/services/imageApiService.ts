import axios from 'axios';
import { ColorPaletteResponse } from '../models/PaletteModels'

const API_URL = 'http://localhost:8000/api/image/';

export const uploadImage = async (imageFile: File) => {
    const payload = new FormData();
    payload.append('file', imageFile);
    
    const response = await axios.post(`${API_URL}upload/`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    
    return response.data;
};

export const getColorPalette = async () => {
    const response = await axios.get(`${API_URL}palette/`);

    console.log(response.data)

    const { color_palette, color_palette_details }: ColorPaletteResponse = response.data;

    return {color_palette, color_palette_details};
}

export const swapColorsService = async (originalColor: string, newColor: string) => {
    const payload = {
        originalColor: originalColor,
        newColor: newColor
    }

    const response = await axios.post(`${API_URL}swapColors/`, payload,
        {
            responseType: 'blob'
        }
    );

    return response.data;
}

export const resetImage = async () => {
    const response = await axios.post(`${API_URL}reset/`, {},
        {
            responseType: 'blob'
        }
    );

    return response.data;
}

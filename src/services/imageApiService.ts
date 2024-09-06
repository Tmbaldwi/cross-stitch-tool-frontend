import axios from 'axios';

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

    return response.data;
}

import axios from 'axios';

const API_URL = 'http://localhost:5168/api/categoria';

export const getAllCategorias = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createCategoria = async (categoria) => {
    const response = await axios.post(API_URL, categoria);
    return response.data;
};
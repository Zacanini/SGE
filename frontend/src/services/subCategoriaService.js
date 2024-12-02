import axios from 'axios';

const API_URL = 'http://localhost:5168/api/subcategoria';

export const getAllSubCategorias = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createSubCategoria = async (subCategoria) => {
    const response = await axios.post(API_URL, subCategoria);
    return response.data;
};

export const deleteSubCategoria = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.status === 204;
};
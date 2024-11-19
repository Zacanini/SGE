import axios from 'axios';

const API_URL = 'http://localhost:5168/api/produto';

export const getAllProdutos = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getProdutoById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createProduto = async (produto) => {
    const response = await axios.post(API_URL, produto);
    return response.data;
};

export const updateProduto = async (id, produto) => {
    const response = await axios.put(`${API_URL}/${id}`, produto);
    return response.data;
};

export const deleteProduto = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
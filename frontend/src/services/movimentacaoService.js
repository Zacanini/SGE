import axios from 'axios';

const API_URL = 'http://localhost:5168/api/movimentacao';

export const getAllMovimentacoes = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createMovimentacao = async (movimentacao) => {
    const response = await axios.post(API_URL, movimentacao);
    return response.data;
};
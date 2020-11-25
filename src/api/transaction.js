import apiClient from './client';

// const ENDPOINT = 'auth/'

export const createTransaction = (transaction) =>
    apiClient.post('/transactions', transaction);
export const updateTransaction = (transaction) =>
    apiClient.put('/transactions/' + transaction._id, transaction);
export const getAll = (_id) => apiClient.get('/transactions/user/' + _id);
export const getOne = (_id) => apiClient.get('/transactions/' + _id);

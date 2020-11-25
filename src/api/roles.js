import apiClient from './client';

// const ENDPOINT = 'auth/'

export const getRoles = () => apiClient.get('users-permissions/roles');

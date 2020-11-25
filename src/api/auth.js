import AuthStore from './authStore';
import apiClient from './client';

// const ENDPOINT = 'auth/'

export const login = (credentials) =>
    apiClient.post('/auth/local', credentials).then(async (response) => {
        if (response.ok) {
            await AuthStore.setToken(response.data.jwt);
        }
        return response;
    });

export const register = (user) => apiClient.post('/auth/local/register', user);
export const whoAmI = () => apiClient.get('users/me');
export const getProfilePic = () => apiClient.get('/users/getProfileImage');
export const uploadProfile = (form) =>
    apiClient.post('/users/uploadProfileImage', form);

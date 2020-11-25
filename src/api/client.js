import { create } from 'apisauce';
import AuthStore from './authStore';

const apiClient = create({
    baseURL:
        process.env.NODE_ENV === 'production'
            ? 'http://rocket-miners.herokuapp.com'
            : 'http://localhost:1337',
});

apiClient.addAsyncRequestTransform(async (request) => {
    //* exclude request authentication routes
    if (request.url.match('auth')) return;
    if (request.url.match('roles')) return;
    let authToken = await AuthStore.getToken();
    // console.log(request);
    if (!authToken) return;
    request.headers['Authorization'] = 'Bearer ' + authToken;
});

export default apiClient;

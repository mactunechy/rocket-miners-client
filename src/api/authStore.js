import jwtDecode from 'jwt-decode';

export default class AuthStore {
    static STORAGE_KEY = 'userToken';

    static getToken() {
        try {
            return localStorage.getItem(AuthStore.STORAGE_KEY);
        } catch (error) {
            console.log('GetToken error', error);
            return null;
        }
    }
    static async decodeToken() {
        let token = await AuthStore.getToken();
        if (token) {
            try {
                return jwtDecode(token);
            } catch (e) {
                return null;
            }
        }
    }

    static setToken(token) {
        localStorage.setItem(AuthStore.STORAGE_KEY, token);
    }

    static removeToken() {
        localStorage.removeItem(AuthStore.STORAGE_KEY);
    }
}

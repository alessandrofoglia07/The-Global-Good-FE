import axiosBase from 'axios';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { localStorageUserPool, sessionStorageUserPool } from '@/utils/userPool';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axios = axiosBase.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

axios.interceptors.request.use((config) => {
    let user = localStorageUserPool.getCurrentUser();
    if (!user && localStorage.getItem('rememberMe') === '1') {
        user = sessionStorageUserPool.getCurrentUser();
    }
    if (user) {
        user.getSession((err: Error | null, session: CognitoUserSession | null) => {
            if (err) {
                console.error(err);
            } else {
                const accessToken = session!.getAccessToken();
                config.headers['Authorization'] = `Bearer ${accessToken.getJwtToken()}`;
            }
        });
    }
    return config;
});

export default axios;
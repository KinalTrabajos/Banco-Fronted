import axios from 'axios'

const apiBanc = axios.create({
    baseURL: "http://localhost:8080/BancoSystem/v1",
    timeout: 5000,
    headers: { "Cache-Control": "no-cache, no-store, must-revalidate" }
})


apiBanc.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem('user');
        if (user) {
            const token = JSON.parse(user).token;
            config.headers['x-token'] = token; 
        }
        return config;
    },
    (e) => Promise.reject(e)
)

export const login = async (data) => {
    try {
        return await apiBanc.post('/auth/login', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const register = async(data) => {
    try {        
        return await apiBanc.post('/auth/register', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}
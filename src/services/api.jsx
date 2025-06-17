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

export const getAccountOfUser = async (data) => {
    try {
        const response = await apiBanc.get(`/account/searchAccount`,{
            params:{
                noAccount: data.noAccount,
                id: data.id
            }
        });
        return response.data.account
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const viewUser = async(id) => {
    try {
        return await apiBanc.get(`/users/viewUserById/${id}`)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const getAllAccounts = async () => {
    try {
        return await apiBanc.get('/account/getAccount');
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const updateUser = async(id,data) => {
    try{
        return await apiBanc.put(`/users/updateUser/${id}`,data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}

export const updatePassword = async(id,data) => {
    try{
        return await apiBanc.put(`/users/updatePassword/${id}`, data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}

export const getBillByUser = async(id) => {
    try {
        return await apiBanc.get(`/bill/${id}`)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const getAllBills = async () => {
    try {
        return await apiBanc.get(`/bill/`);
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getHistoryByUser = async (id) => {
    try {
        return await apiBanc.get(`/history/${id}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}
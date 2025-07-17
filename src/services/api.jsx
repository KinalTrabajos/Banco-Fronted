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
            message: e.message,
            stack: e.stack // opcional, útil para debug
        };
    }
}

export const viewProducts = async() => {
    try {
        return await apiBanc.get('/products/getProducts')
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const addShoppings = async(data) => {
    try {
        return await apiBanc.post('/buy/',data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const addShoppingsPoints = async(data) => {
    try {
        return await apiBanc.post('/buy/points',data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const searchProductByUser = async (data) => {
    try {
        return await apiBanc.post('/products/getProductsByUserId', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}


export const addProduct = async(data) => {
    try {
        return await apiBanc.post(`/products/addProduct`, data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const deleteProduct = async(id) => {
    try {
        return await apiBanc.delete(`/products/deleteProduct/${id}`,{
            data: { confirm: true },
        })
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const updateProduct = async(id,data) => {
    try {
        return await apiBanc.put(`/products/updateProduct/${id}`,data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const tranfers = async(data) => {
    try {
        return await apiBanc.post('/transfer/makeTransfer',data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const cancelTranfers = async(id) => {
    try {
        return await apiBanc.delete(`/transfer/cancelTransfer/${id}`)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const viewFavorite = async (id) => {
  try {
    return await apiBanc.get(`/favorites/viewFavorites?=${id}`)
  } catch (e) {
    return {
      error: true,
      e
    }
  }
}

export const addFavorite = async (data) => {
    try {
        return await apiBanc.post('/favorites/addFavorite', data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const deleteFavorite = async (id) => {
    try {
        return await apiBanc.delete(`/favorites/deleteFavorite/${id}`,{
            data: { confirm: true },
        })
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const updateFavorite = async (id,data) => {
    try {
        return await apiBanc.put(`/favorites/editFavorite/${id}`, data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const getRequestPending = async() => {
    try {
        return await apiBanc.get('/accountRequest/account-requests/view')
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const updateStatusRequests = async (id, data) => {
    try {
        return await apiBanc.put(`/accountRequest/account-requests/${id}`, data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const createAccountRequest = async (data) => {
    try {
        return await apiBanc.post('/accountRequest/account-request', data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}
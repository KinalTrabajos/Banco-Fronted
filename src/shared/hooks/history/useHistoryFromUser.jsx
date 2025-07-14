import { useState, useCallback } from 'react'; 
import toast from 'react-hot-toast';
import { getHistoryByUser as getHistoryByUserRequest } from '../../../services';

export const useGetHistoryFromUser = () => {
    const [historyUser, setHistoryUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(null); 

    const getHistoryByUser = useCallback(async (params) => {
        setIsLoading(true); 
        setError(null); 

        try {
            const responseData = await getHistoryByUserRequest(params); 
            
            if(responseData.error){
                const errorMessage = responseData.e?.response?.data || 'Error al buscar el historial';
                toast.error(errorMessage);
                setError(errorMessage);
                setHistoryUser([]); 
            } else {
                setHistoryUser(responseData.data.histories);
            }
        } catch (err) {
            const errorMessage = err.message || 'Ocurrió un error inesperado al obtener el historial.';
            toast.error(errorMessage);
            setError(errorMessage);
            setHistoryUser([]);
        } finally {
            setIsLoading(false); 
        }
    }, []); 

    return {
        historyUser,
        getHistoryByUser,
        isLoading, 
        error 
    };
};
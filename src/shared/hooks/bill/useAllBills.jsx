import { useState, useCallback } from "react";
import toast from 'react-hot-toast';
import { getAllBills as getAllBillsRequest } from "../../../services";

export const useGetAllBills = () => {
    const [allBills, setAllBills] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const getAllBills = useCallback(async () => {
        setLoading(true); 
        setError(null);   

        try {
            const responseData = await getAllBillsRequest();

            if (responseData.error) {
                toast.error(
                    responseData.e?.response?.data || 'Error al buscar las cuentas'
                );
                setError(responseData.e?.response?.data || 'Error desconocido'); // Guarda el error
            } else {
                setAllBills(responseData.data.bills);
            }
        } catch (e) {
            console.error("Error en getAllBills:", e);
            toast.error('Ocurrió un error inesperado al obtener las facturas.');
            setError(e.message || 'Error inesperado');
        } finally {
            setLoading(false); 
        }
    }, []);

    return {
        allBills,
        loading, 
        error,  
        getAllBills
    };
};
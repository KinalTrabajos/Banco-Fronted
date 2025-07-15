import { useState,  } from "react";
import toast from "react-hot-toast";
import { getRequestPending } from "../../../services";

export const useRequestPending = () => {
    const [requests, setRequests] = useState([]);

        const getRequestsAccounts = async () => {
            const  responseData = await getRequestPending();

        if(responseData.error){
            return toast.error(
                responseData.e?.response?.data || 'Error to search the requests'
            )
        }else{
            setRequests(responseData.data.requests)
        }
    }

    return {
        requests,
        getRequestsAccounts
    }
}
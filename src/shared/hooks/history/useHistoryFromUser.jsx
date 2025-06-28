import { useState } from 'react';
import toast from 'react-hot-toast';
import { getHistoryByUser as getHistoryByUserRequest } from '../../../services';

export const useGetHistoryFromUser = () => {
    const [historyUser, setHistoryUser] = useState([]);

    const getHistoryByUser = async (id) => {
        const responseData = await getHistoryByUserRequest(id);

        if(responseData.error){
            return toast.error(
                responseData.e?.response?.data || 'Error to search the history'
            )
        }else {
            setHistoryUser(responseData.data.histories)
        }
    }

    return  {
        historyUser,
        getHistoryByUser
    }
}
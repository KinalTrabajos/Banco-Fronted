import { useState } from "react";
import toast from 'react-hot-toast';
import { getBillByUser as searchBillRequest } from "../../../services";

export const useBillDetails = () => {
    const [billDetails, setBillDetails] = useState([]);

    const getBillByUser = async (id) => {
        const responseData = await searchBillRequest(id);

         if(responseData.error){
            return toast.error(
                responseData.e?.response?.data || 'Error to search the account'
            )
        }else {
            setBillDetails(responseData.data.bills)
        }

    }

    return {
        billDetails,
        getBillByUser
    }
}
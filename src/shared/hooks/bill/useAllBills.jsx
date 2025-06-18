import { useState } from "react";
import toast from 'react-hot-toast';
import { getAllBills as getAllBillsRequest } from "../../../services";

export const useGetAllBills = () => {
    const [allBills, setAllBills] = useState([]);

    const getAllBills = async () => {
        const responseData = await getAllBillsRequest();

        if(responseData.error){
            return toast.error(
                responseData.e?.response?.data || 'Error to search the accounts'
            )
        }else {
            setAllBills(responseData.data.bills)
        }
    }

    return {
        allBills,
        getAllBills
    }

}
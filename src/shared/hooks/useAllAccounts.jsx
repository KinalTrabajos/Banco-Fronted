import { useState } from "react";
import toast from "react-hot-toast";
import { getAllAccounts as getAllAccountsRequest } from "../../services/api";

export const useGetAllAccounts = () => {
    const [allAccounts, setAllAccounts] = useState([]);

    const getAllAccounts = async () => {
        const responseData = await getAllAccountsRequest();

        if(responseData.error){
            return toast.error(
                responseData.e?.response?.data || 'Error to search the accounts'
            )
        }else {
            setAllAccounts(responseData.data.accounts)
        }
    }

    return {
        allAccounts,
        getAllAccounts
    }
}
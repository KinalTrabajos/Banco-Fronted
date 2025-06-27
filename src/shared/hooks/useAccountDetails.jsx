import { useState } from "react";
import toast from "react-hot-toast";
import { getAccountOfUser as searchAccountRequest } from "../../services/api";

export const useAccountDetails = () => {
    const [accountDetails, setAccountDetails] = useState({});

    const getAccountOfUser = async (data) => {
        const responseData = await searchAccountRequest(data);

        if(responseData.error){
            return toast.error(
                responseData.e?.response?.data || 'Error to search the account'
            )
        }else {
            setAccountDetails(responseData)
        }

    }

    return {
        accountDetails,
        getAccountOfUser
    }
}

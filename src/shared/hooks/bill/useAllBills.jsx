import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { getBillByUser, getAllBills } from "../../../services";

export const useBillsByRole = (user) => {
    const [bills, setBills] = useState([]);
    const fetchBills = useCallback(async () => {
        if (!user) return;

        let responseData;

        if (user.role === "ADMIN_ROLE") {
            responseData = await getAllBills();
        } else {
            responseData = await getBillByUser(user.id);
        }

        if (responseData.error) {
            toast.error(responseData.e?.response?.data || "Error fetching bills");
        } else {
            setBills(responseData.data.bills || []);
        }
    }, [user]);

    return { bills, fetchBills };
};

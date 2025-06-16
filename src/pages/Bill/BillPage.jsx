import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { useState, useEffect } from "react";

export const  BillPage = () => {
    const [user, setUser] = useState('');
    
    useEffect(() => {
        const userLocal = JSON.parse(localStorage.getItem('user'));
        setUser(userLocal);
    },[])

    useEffect(() => {
        if(user?.role === "ADMIN_ROLE") {
            const fetchAccount = async () => {
                
            };

            fetchAccount();
        }
    },[user])

    return(
        
    )

}
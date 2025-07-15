import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAccountRequest as registerRequest } from "../../services";
import toast from "react-hot-toast";


export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const register = async (userData) => {
        setIsLoading(true);

        const response = await registerRequest(userData);

        console.log(response);

        setIsLoading(false);

        if (response.error) {
            const errRes = response.error?.response;
            if (errRes?.data?.errors && Array.isArray(errRes.data.errors)) {
                errRes.data.errors.forEach((err) => toast.error(err.msg));
            } else {
                toast.error(errRes?.data || "Ocurrió un error al registrar, intenta de nuevo");
            }
            return;
        }

        toast.success("Usuario registrado correctamente");

        navigate("/", { replace: true });
        window.location.reload();
    };

    return {
        register,
        isLoading,
    };
};

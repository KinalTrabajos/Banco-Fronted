import { useEffect, useState } from "react";
import { viewUser } from "../../../services/api";

export const useViewUser = (id) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const fetchUser = async () => {
        if (!id) {
            console.error("ID de usuario no proporcionado")
            setIsLoading(false)
            return
        }

        const response = await viewUser(id)

        if (response.error) {
            console.error("Error al obtener Usuarios", response.e)
        } else {
            setUser(response.data.users[0])
        }

        setIsLoading(false)
    }

    useEffect(() => {
        fetchUser()
    }, [id])

    return {
        user,
        setUser,
        isLoading,
    }
}

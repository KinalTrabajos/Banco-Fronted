import { useState } from "react";
import { updateUser, updatePassword } from "../../../services/api";
import toast from "react-hot-toast"

export const useUpdateUser = (id) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleUpdateUser = async ({ name, direction, work, income }) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await updateUser(id, {name,direction,work,income})
            toast.success("Usuario actualizado correctamente")
            return response
        } catch (err) {
            toast.error("Error al actualizar el usuario")
            return { error: true, err }
        } finally {
            setLoading(false)
        }
    }

    const handleUpdatePassword = async ({ passwordOld, passwordNew }) => {
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const response = await updatePassword(id, {passwordOld,passwordNew})
            toast.success("¡Contraseña actualizada correctamente!")
            return response
        } catch (err) {
            toast.error("Error al actualizar la contraseña")
            return { error: true, err }
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        success,
        handleUpdateUser,
        handleUpdatePassword,
    }
}

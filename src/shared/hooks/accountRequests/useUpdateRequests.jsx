import { updateStatusRequests as updateStatus } from "../../../services"
import { useState } from "react"
import toast from "react-hot-toast"

export const  updateStatusRequests = () => {
    const [message, setMessage] = useState('')

    const updateRequests = async (id, data) => {
        const responseData = await updateStatus(id, data)

        if(responseData.errror){
            toast.error('Error al actualizar la peticion')
            return { error: true}
        }

        toast.success('Peticion actualizada')
        setMessage(responseData.msg)
    }

    return{
        message,
        updateRequests
    }
}
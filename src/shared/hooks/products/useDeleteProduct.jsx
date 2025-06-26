import { deleteProduct } from "../../../services/api";
import toast from "react-hot-toast";

export const useDeleteProduct = () => {
    const deleteProduc = async(id) => {
        const response = await deleteProduct(id)
        
        if(response.error){
            toast.error("Error al eliminar Producto")
            return {error: true}
        }

        toast.success("Producto Eliminado Correctamente")
        window.location.reload()
        return response
    }

    return {deleteProduc}

}

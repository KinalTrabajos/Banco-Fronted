import { deleteFavorite } from "../../../services";
import toast from "react-hot-toast";

export const useDeleteFavorito = () => {
    const deleteFavo = async(id) =>{
        const response = await deleteFavorite(id)

        if(response.error){
            toast.error("Error al eliminar Favorito")
            return{ error: true}
        }

        toast.success("Favorito Eliminado Correctamente")
        return response
    }

    return {deleteFavo}
}
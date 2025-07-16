import { updateFavorite } from "../../../services"
import toast from "react-hot-toast"

export const useEditFavorite = () => {
  const editFavo = async (id, alias) => {
    const response = await updateFavorite(id, { alias })

    if (response.error) {
      toast.error("Error al actualizar el favorito")
      return { error: true }
    }

    toast.success("Favorito actualizado correctamente")
    return response
  }

  return { editFavo }
}
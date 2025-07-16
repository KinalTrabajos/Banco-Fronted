import { addFavorite } from "../../../services";
import { useState } from "react";
import toast from "react-hot-toast";

export const useAddFavorite = () => {
  const [isLoading, setIsLoading] = useState(false)

  const addFavo = async (noAccount, alias) => {
    setIsLoading(true)

    const response = await addFavorite({
      noAccount,
      alias
    })

    setIsLoading(false)

    if (response.error) {
      return toast.error(response.e?.response?.data?.msg || "Error al agregar Favorito")
    }

    toast.success("Favorito agregado correctamente")
  }

  return {
    addFavo,
    isLoading
  }
}
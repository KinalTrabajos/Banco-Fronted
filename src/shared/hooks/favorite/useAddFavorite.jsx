import { addFavorite } from "../../../services"
import { useState } from "react"
import toast from "react-hot-toast"

export const useAddFavorite = () => {
  const [isLoading, setIsLoading] = useState(false)

  const addFavo = async(favoriteAccount, alias) => {
    setIsLoading(true)

    const response = await addFavorite({
      favoriteAccount: { _id: favoriteAccount }, 
      alias
    })

    setIsLoading(false)

    if(response.error){
      return toast.error(response.error?.response?.data || 'Error al agregar Favorito')
    }

    toast.success('Favorito agregado Correctamente')
  }

  return{
    addFavo,
    isLoading
  }
}

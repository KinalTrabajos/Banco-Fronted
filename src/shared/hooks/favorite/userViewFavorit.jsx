import { viewFavorite } from "../../../services/api"
import { useEffect, useState } from "react"

export const useViewFavorite = (id) => {
  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchFavorite = async () => {
    setIsLoading(true)
    const response = await viewFavorite(id)
    if (response.error) {
      console.log("Error al obtener favoritos", response.e)
    } else {
      setFavorites(response.data.favorites)
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (id && id !== "") {
      fetchFavorite()
    }
  }, [id])

  return {
    favorites,
    isLoading,
    getFavorites: fetchFavorite,
  }
}

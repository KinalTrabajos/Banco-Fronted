import { useEffect, useState } from "react"
import { viewProducts } from "../../../services/api"

export const useProductsView = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchProducts = async () => {
        setIsLoading(true)
        const response = await viewProducts()
        if(response.error){
            console.error("Error al obtener Productos:", response.e)
        }else {
            setProducts(response.data.products)
        }
        setIsLoading(false)
    }

    useEffect(()=> {
        fetchProducts()
    }, [])

    return{
        products,
        isLoading,
        fetchProducts
    }

}
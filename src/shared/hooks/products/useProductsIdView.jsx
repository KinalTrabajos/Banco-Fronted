import { useEffect, useState } from "react";
import { searchProductByUser } from "../../../services/api";

export const useProductsIdView = (userId) => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            const response = await searchProductByUser({ userId })
            if (!response.error) {
                setProducts(response.data.products || [])
            }
            setIsLoading(false)
        }

        if (userId) fetch()
    }, [userId]);

    return { products, isLoading }
}


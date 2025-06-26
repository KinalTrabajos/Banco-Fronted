import { useState } from "react"
import { addShoppings } from "../../../services/api"
import toast from "react-hot-toast"

export const useAddShopping = () => {
    const [isLoading, setIsLoading] = useState(false)
    
 const addCompra = async (keeperUser, items) => {
   setIsLoading(true)
 
   const response = await addShoppings({ keeperUser, items });
 
   setIsLoading(false)
 
   if (response.error) {
     return toast.error(
       response?.e?.response?.data?.message || "No tiene saldo suficiente ."
     )
   }
 
   toast.success("¡Compra realizada exitosamente!")
 }

    return {
      addCompra,
      isLoading
    }
}

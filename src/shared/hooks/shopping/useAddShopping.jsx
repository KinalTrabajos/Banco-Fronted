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
    toast.error(
       response?.e?.response?.data?.message || "No tiene saldo suficiente ."
     )
     return null;
   }
 
   toast.success("¡Compra realizada exitosamente!")

   return response.data.factura || null
 }

    return {
      addCompra,
      isLoading
    }
}

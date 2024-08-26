'use client'

import { createContext, type ReactElement, type Dispatch, useContext, useState } from "react"
import type { Cart } from "@/lib/const";

const 
  CartContext = createContext({} as { cart?: Cart, setCartProducts?: Dispatch<React.SetStateAction<Cart>>}),
  useCartContext = () => useContext(CartContext);

export default function CartProvider({ children }: { children: ReactElement }) {
  const [cart, setCartProducts] = useState<Cart>([])

  return (
    <CartContext.Provider value={{cart, setCartProducts}}>
      {children}
    </CartContext.Provider>
  )
}

export { useCartContext }

"use server"

import { Cart, ProductInCart } from "@/lib/const";

export async function handleCart(prevList: Cart, updatedProduct: ProductInCart): Promise<Cart> {
  let index: number = 0;
  
  for (let {name, quantity} of prevList) {
    ++index

    if (name === updatedProduct.name) {
      quantity = updatedProduct.quantity;
      
      //return quantity ? JSON.stringify(prevList) : JSON.stringify(prevList.slice(0, index).concat(prevList.slice(++index)));
      return 1
    }
  }

  prevList.push(updatedProduct)
  //return JSON.stringify(prevList)
  return 1
}
import data from "./data.json"
import { formatSrcProducts } from "./utils";

export interface Product {
  image: {
    thumbnail: string, 
    mobile: string, 
    tablet: string,
    desktop: string,
  }, 
  name: string, 
  category: string, 
  price: number,
}

export interface ProductInCart extends Product {
  quantity: number,
}

export type Cart = (ProductInCart | never)[]

export const products = formatSrcProducts(data);

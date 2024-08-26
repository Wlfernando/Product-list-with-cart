"use client"

import { useState } from "react";
import { useCartContext } from "../_context/cartContext";
import { Product } from "@/lib/const";

const classIcon = "border-2 border-white rounded-full aspect-square w-5 grid place-content-center relative"

export default function AddButton({product}: {product: Product}) {
  const { cart, setCartProducts } = useCartContext();
  const [visible, setVisible] = useState<boolean>(false);

  const reference = cart?.find((p) => p.name === product.name);
  const hasReference = !!reference;
  const { quantity = 0 } = reference ?? {};
  const openedControls = hasReference || visible;

  function update(quantity: number) {
    if (quantity > 99 || quantity < 0) return
    setVisible(true)

    setCartProducts?.((prev) => {
      const theIndex = prev.findIndex(p => p.name === product.name);

      if(quantity > 0) {
        const newObj = {...product, quantity};

        return theIndex < 0
          ? [...prev, newObj]
          : prev.with(theIndex, newObj)
      } else {
        return prev.filter((_, i) => i !== theIndex)
      }
    })
  }

  return (
    <>
      <menu className={`group/menu rounded-full border border-neutral-400 flex bg-orange-700 w-[65%] m-auto relative bottom-6 overflow-hidden hover:has-[>:only-child]:border-orange-700 transition-colors sm:text-sm`} onBlur={(e) => {if(!e.currentTarget.contains(e.relatedTarget)) setVisible(false)}} >
      {openedControls ?
        <>
          <button 
            type="button" 
            className={`grow pl-7 grid items-center justify-start group transition-colors`}
            onClick={() => update(quantity - 1)} 
          >
            <div className={`${classIcon} right-4 group-hover:bg-white transition-colors`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2">
                <path className="group-hover:fill-orange-700 fill-white transition-colors" d="M0 .375h10v1.25H0V.375Z" />
              </svg>
            </div>
          </button>
          <input 
            type="number"
            value={quantity.toString().replace(/^(0)\d/, '')}
            onChange={({ target: { value }}) => update(+value)}
            className="text-center w-9 bg-inherit text-white py-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 font-normal" 
          />
          <button 
            type="button" 
            className={`grow pr-7 grid items-center justify-end group transition-colors`} 
            onClick={() => update(quantity + 1)} 
          >
            <div className={`${classIcon} left-4 group-hover:bg-white transition-colors`} >
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                <path className="group-hover:fill-orange-700 fill-white transition-colors" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
              </svg>
            </div>
          </button>
        </> :
        <button type="button" className={`px-7 py-3 bg-white flex grow gap-1 items-center group-hover/menu:text-orange-700 transition-colors`} onClick={() => update(1)}>
          <img src='/icon/icon-add-to-cart.svg' alt="cart" />
          <p>Add to Cart</p>
        </button>
      }
      </menu>
    </>
  )
}
"use client"

import Link from "next/link";
import { useCartContext } from "../_context/cartContext"

export default function CheckIn() {
  const { cart = [], setCartProducts } = useCartContext()
  const countedProducts = cart.length;
  
  let totalItems = 0;
  let totalOrder = 0;

  const list = cart.map((p, index) => {
    const totalPrice = p.quantity * p.price;
    totalItems += p.quantity;
    totalOrder += totalPrice;

    return (
      <li key={p.name} className="grid grid-rows-3 grid-cols-[26px_repeat(2,_56px)_repeat(2,_1fr)] md:grid-cols-[34px_repeat(2,_72px)_repeat(2,_1fr)] justify-items-end gap-y-2 md:gap-y-0">
        <h3 className="font-bold col-span-4 justify-self-start">{p.name}</h3>
        <button 
          className="w-3.5 md:w-5 aspect-square row-span-2 self-center bg-[url('/icon/icon-remove-item.svg')] bg-no-repeat bg-center bg-[length:59%] md:bg-[length:75%] border-2 border-yellow-700 border-opacity-30 rounded-full hover:opacity-75 transition-opacity"
          onClick={() => setCartProducts?.((prev) => prev.filter((_, i) => i !== index))}
        ></button>
        <p className="font-bold text-orange-700 justify-self-start">{p.quantity}x</p>
        <p className="text-yellow-900"><span className="text-xs md:text-sm">@ </span>${p.price.toFixed(2)}</p>
        <p className="text-yellow-900 font-bold">${totalPrice.toFixed(2)}</p>
        <hr className="col-span-full bg-orange-50 row-start-3 justify-self-stretch self-center"/>
      </li>
    )
  });

  return (
    <>
      <section className="min-w-64 w-3/4 max-w-96 md:w-auto md:grow text-black bg-white p-5 rounded-xl grid gap-6 text-xs md:text-base">
        <h2 className="text-orange-700 font-bold text-xl">Your Cart ({totalItems})</h2>
        {countedProducts
          ? <>
              <ul>{list}</ul>
              <div className="flex justify-between items-center">
                <p>Order Total</p>
                <p className="font-bold text-xl">${totalOrder.toFixed(2)}</p>
              </div>
              <div className="flex justify-center bg-orange-50 p-2 rounded-xl">
                <img src="/icon/icon-carbon-neutral.svg" alt="tree icon" />
                <p className="text-sm">This is a <span className="font-bold">carbon-neutral</span> delivery</p>
              </div>
              <Link href={"/?modal=order-confirmed"} className="bg-orange-700 rounded-full text-white py-3 hover:bg-orange-800 transition-colors text-center" >Confirm Order</Link>
            </>
          : <>
            <img src="/icon/illustration-empty-cart.svg" alt="cake" className="justify-self-center"/>
            <p className="justify-self-center text-yellow-800">Your added items will appear here</p>
          </>
        }
      </section>
    </>
  )
}

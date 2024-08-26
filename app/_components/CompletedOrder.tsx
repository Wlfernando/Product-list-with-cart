"use client"

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useCartContext } from "../_context/cartContext";

export default function CompletedOrder() {
  const params = useSearchParams();
  const modal = params.has('modal');
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement | null>(null);
  const { cart = [], setCartProducts } = useCartContext()

  function close() {
    setCartProducts?.([])
    router.replace('/');
  }

  useEffect(()=>{
    if(!modal) return

    function listen(e: MouseEvent | KeyboardEvent): void {
      if (e instanceof KeyboardEvent && e.key === 'Escape' || e.target instanceof Node && e.target.nodeName === 'DIALOG') {
        close()
      }
    }

    dialog.current?.showModal()
    document.addEventListener('keydown', listen)
    document.addEventListener('click', listen)

    return () => {
      document.removeEventListener('click', listen)
      document.removeEventListener('keydown', listen)
      dialog.current?.close()
    }
  }, [modal])

  if(!modal || !!!cart.length) return <></>

  let totalOrder = 0

  return (
    <dialog ref={dialog} className="[inset-block-start:unset] sm:[inset-block-start:revert] rounded-t-xl sm:rounded-md backdrop:bg-black/65 w-screen max-w-full sm:min-w-[436px] sm:w-1/3" >
      <aside className="grid gap-7 p-3 sm:p-7">
        <img src="/icon/icon-order-confirmed.svg" alt="checked" />
        <hgroup>
          <h2 className="font-bold text-3xl w-min sm:w-auto">Order Confirmed</h2>
          <p className="text-yellow-900 text-sm mt-3 sm:m-0" >We hope you enjoy your food!</p>
        </hgroup>
        <ul className="bg-orange-50 p-5 font-bold text-sm sm:text-base">
          {cart.map(({image: { thumbnail }, name, price, quantity}) => {
            const totalPrice = price * quantity;
            totalOrder += totalPrice

            return (
              <li className="grid grid-cols-[48px_35px_65px_1fr_70px] grid-rows-3 gap-x-2" >
                <img src={thumbnail} alt={name} className="row-span-2 aspect-square"/>
                <h3 className="col-span-3 overflow-hidden text-nowrap text-ellipsis" >{name}</h3>
                <p className="justify-self-end self-center row-span-2">${totalPrice.toFixed(2)}</p>
                <p className="text-orange-700" >{quantity}x</p>
                <p className="font-normal text-yellow-900"><span className="text-xs">@</span>${price.toFixed(2)}</p>
                <hr className="col-span-full row-start-3 bg-orange-50/70 self-center" />
              </li>
            )
          })}
          <li className="flex justify-between py-2">
            <p className="font-normal">Order Total</p>
            <p className="text-base">${totalOrder.toFixed(2)}</p>
          </li>
        </ul>
        <button className="bg-orange-700 rounded-full text-white py-3 hover:bg-orange-800 transition-colors text-sm" onClick={close}>Start New Order</button>
      </aside>
    </dialog>
  )
}
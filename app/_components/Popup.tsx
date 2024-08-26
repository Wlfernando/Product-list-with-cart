"use client"

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Popup({onClose = () => {}, children, closeRef}: { onClose?: ()=> void, children: React.ReactNode, closeRef: React.MutableRefObject<null | Function>}) {
  const params = useSearchParams();
  const modal = params.has('modal');
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement | null>(null);

  function close() {
    onClose()
    router.replace('/');
  }

  if(!closeRef.current) closeRef.current = close

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

  if(!modal) return <></>

  return (
    <dialog ref={dialog} className="[inset-block-start:unset] sm:[inset-block-start:revert] rounded-t-xl sm:rounded-md backdrop:bg-black/65 w-screen max-w-full sm:min-w-[436px] sm:w-1/3" >
      {children}
    </dialog>
  )
}
import { products } from "@/lib/const";
import Card from "./Card";

export default function Showcase() {
  return (
    <>
      <section className="basis-[70%]">
        <h2 className="text-black text-2xl font-bold">Desserts</h2>
        <ul className="flex flex-wrap gap-5 pt-5 justify-evenly">
          {products.map(product => <li key={product.name} ><Card {...product} /></li>)}
        </ul>
      </section>
    </>
  )
}

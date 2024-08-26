import type { Product } from "@/lib/const"
import AddButton from "./AddButton"

export default function Card({ image, name, category, price }: Product) {
  const removedThumbnail = Object.entries(image).slice(1)
  const addedImgMedia = removedThumbnail.map(([device, src]) => ({src, media: device === 'mobile' ? 639 : device === 'tablet' ? 767 : 1079}))

  return (
    <>
      <article className="text-black min-w-full w-full max-w-64 [&:has(menu>input)>picture>img]:outline-orange-700 text-sm sm:text-base font-bold md:text-wrap">
        <picture >
          {addedImgMedia.map((img, i) => i < 2 ? 
            <source srcSet={img.src} media={`(max-width:${img.media}px)`} key={img.media} /> : 
            <img src={img.src} alt={name} key={img.media} className="outline-transparent outline-2 outline rounded-lg transition-[outline]"/>
          )}
        </picture>
        <AddButton product={{image, name, category, price}} />
        <p className="text-yellow-900" >{category}</p>
        <p className="font-normal" >{name}</p>
        <p className="text-orange-700" >${price.toFixed(2)}</p>
      </article>
    </>
  )
}
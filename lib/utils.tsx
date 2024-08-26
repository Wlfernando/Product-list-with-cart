import type { Product } from './const'

function normalizeImageSrc(url: string): string {
  return url.replace('./assets/images', '/image')
};

export function formatSrcProducts(products: Product[]): Product[] {
  return products.map(({ image, ...product }) => ({ 
    image: Object.fromEntries(Object.entries(image).map(([key, value]) => [key, normalizeImageSrc(value)])) as Product["image"],
    ...product,
  }))
};

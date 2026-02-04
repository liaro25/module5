import { Product } from "@/types/product"
import Link from "next/link"

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (

<div className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <div className="relative w-full overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-contain aspect-square group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-lg shadow-sm line-clamp-1">
            {product.category.name}
          </span>
        </div>     </div>
      <div className="p-4 flex flex-col grow">
        <h2 className="text-lg font-bold text-gray-900 line-clamp-2 min-h-10">
          {product.title}
        </h2>
        <div className="mt-auto">
          <p className="text-lg font-bold text-blue-600">
            ${product.price.toLocaleString()}
          </p>

          <div className="flex items-center gap-3 justify-between">
            <Link
              href={`/products/${product.id}`}
              className="mt-2 block text-center w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold py-2.5 rounded-lg transition-all"
            >
              View Detail
            </Link>
            <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Product } from "@/types/product";
import AddToCartButton from "@/components/AddToCart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const {
    id,
    title,
    price,
    images,
    category: { name: categoryName },
  } = product;

  const priceLabel = `$${price.toLocaleString()}`;
  const imageSrc = images[0];

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="relative w-full overflow-hidden bg-gray-100">
        <img
          src={imageSrc}
          alt={title}
          className="aspect-square h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-lg shadow-sm line-clamp-1">
            {categoryName}
          </span>
        </div>
      </div>

      <div className="flex grow flex-col p-4">
        <h2 className="min-h-10 text-lg font-bold text-gray-900 line-clamp-2">
          {title}
        </h2>

        <div className="mt-auto">
          <p className="text-lg font-bold text-blue-600">{priceLabel}</p>

          <div className="flex items-center justify-between gap-3">
            <Link
              href={`/products/${id}`}
              className="mt-2 block w-full rounded-lg bg-gray-100 py-2.5 text-center text-sm font-semibold text-gray-800 transition-all hover:bg-gray-200"
            >
              View Detail
            </Link>

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

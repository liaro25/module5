import { Product } from "@/types/product";
import AddToCartButton from "@/components/AddToCart";
import Button from "@/app/ui/button";

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
  const imageSrc = images?.[0] || "/placeholder.png"; // optional safety

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/40 bg-white/70 backdrop-blur shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Image */}
      <div className="relative w-full overflow-hidden bg-white/60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={title}
          className="aspect-square h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Category pill */}
        <div className="absolute top-2 right-2">
          <span className="rounded-full border border-white/60 bg-white/80 px-2.5 py-1 text-xs font-semibold text-stone-700 shadow-sm backdrop-blur-sm line-clamp-1">
            {categoryName}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex grow flex-col p-4">
        <h2 className="min-h-10 text-base font-bold text-stone-900 line-clamp-2">
          {title}
        </h2>

        <div className="mt-3">
          <p className="text-lg font-extrabold bg-linear-to-r from-[#8B7CFF] to-[#5BC0FF] bg-clip-text text-transparent">
            {priceLabel}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-auto pt-4 flex items-center gap-3">
          <Button
            href={`/products/${id}`}
            variant="secondary"
            size="sm"
            fullWidth
          >
            View Detail
          </Button>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

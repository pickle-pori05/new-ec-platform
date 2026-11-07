import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface Props {
  product: Product;
  onClick: () => void;
  selected?: boolean;
}

/** Square product tile used in shop grids and the product picker. */
const ProductCard = ({ product, onClick, selected = false }: Props) => {
  const soldOut = product.stock <= 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`overflow-hidden bg-white text-left transition-transform active:scale-95
        ${selected ? 'ring-2 ring-emerald-600 ring-inset' : ''}`}
    >
      <div className="relative aspect-square w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
        {soldOut && (
          <span className="absolute inset-0 flex items-center justify-center bg-white/70 text-xs font-bold">Sold out</span>
        )}
      </div>
      <div className="p-2">
        <p className="truncate text-xs font-medium text-gray-800">{product.name}</p>
        <p className="mt-0.5 text-sm font-bold">
          {formatPrice(product.price)} <span className="text-[10px] font-normal text-gray-500">/ {product.unit}</span>
        </p>
      </div>
    </button>
  );
};

export default ProductCard;

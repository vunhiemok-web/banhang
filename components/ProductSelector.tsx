import React from 'react';
import { Product, ProductType } from '../types';
import { Check } from 'lucide-react';

interface ProductSelectorProps {
  product: Product;
  isSelected: boolean;
  onToggle: (id: ProductType) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({ product, isSelected, onToggle }) => {
  return (
    <div 
      onClick={() => onToggle(product.name)}
      className={`
        relative overflow-hidden rounded-xl border-2 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md group
        ${isSelected ? 'border-brand-500 bg-brand-50' : 'border-gray-200 bg-white hover:border-brand-200'}
      `}
    >
      <div className="aspect-w-4 aspect-h-3 w-full h-40 overflow-hidden bg-gray-100">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-500 ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
      </div>

      <div className="absolute top-2 right-2">
        <div className={`
          w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200
          ${isSelected ? 'bg-brand-500 text-white scale-100' : 'bg-white/80 text-transparent scale-90 border border-gray-300'}
        `}>
          <Check size={14} strokeWidth={3} />
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-2">{product.description}</p>
        {product.priceHint && (
          <span className="inline-block px-2 py-0.5 bg-brand-100 text-brand-700 text-xs font-bold rounded-full">
            {product.priceHint}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductSelector;
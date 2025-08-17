"use client"

import Image from "next/image"
import { Heart, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"

interface Product {
  id: string
  name: string
  description: string
  price: number
  original_price?: number
  image_url: string
  rating: number
  review_count: number
  is_featured: boolean
}

interface ProductCardProps {
  product: Product
  onToggleFavorite?: (productId: string) => void
}

export function ProductCard({ product, onToggleFavorite }: ProductCardProps) {
  const { dispatch } = useCart()
  const hasDiscount = product.original_price && product.original_price > product.price

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
      },
    })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-50">
        <Image
          src={product.image_url || "/placeholder.svg?height=300&width=300"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
            Reduced price
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite?.(product.id)}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
        >
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Price */}
        <div className="mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-900">Now ${product.price.toFixed(2)}</span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">${product.original_price?.toFixed(2)}</span>
            )}
          </div>
        </div>

        {/* Product Name */}
        <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h3>

        {/* Description */}
        {product.description && <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.description}</p>}

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.review_count})</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs font-medium border-gray-300 hover:bg-gray-50 bg-transparent"
          >
            Options
          </Button>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="flex-1 bg-[#0071ce] hover:bg-[#004f9f] text-white text-xs font-medium"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}

import { ProductCard } from "./product-card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

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

interface ProductSectionProps {
  title: string
  products: Product[]
  onAddToCart?: (productId: string) => void
  onToggleFavorite?: (productId: string) => void
}

export function ProductSection({ title, products, onAddToCart, onToggleFavorite }: ProductSectionProps) {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">{title}</h2>

        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="sm"
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border-gray-300 hover:bg-gray-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border-gray-300 hover:bg-gray-50"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Product Grid */}
          <div className="overflow-x-auto">
            <div className="flex gap-4 pb-4" style={{ width: `${products.length * 280}px` }}>
              {products.map((product) => (
                <div key={product.id} className="w-64 flex-shrink-0">
                  <ProductCard product={product} onAddToCart={onAddToCart} onToggleFavorite={onToggleFavorite} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

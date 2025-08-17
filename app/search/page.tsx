"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { ProductCard } from "@/components/product-card"
import { SearchFilters } from "@/components/search/search-filters"
import { ChatBubble } from "@/components/ai-chat/chat-bubble"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

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
  categories: { id: string; name: string; slug: string }
}

interface Category {
  id: string
  name: string
  count: number
}

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 1000])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        q: query,
        page: currentPage.toString(),
        minPrice: selectedPriceRange[0].toString(),
        maxPrice: selectedPriceRange[1].toString(),
      })

      if (selectedCategories.length > 0) {
        params.set("categories", selectedCategories.join(","))
      }

      const response = await fetch(`/api/search?${params.toString()}`)
      const data = await response.json()

      setProducts(data.products || [])
      setCategories(data.categories || [])
      setTotalCount(data.totalCount || 0)

      // Set initial price range from data
      if (data.products?.length > 0 && priceRange[1] === 1000) {
        const maxPrice = Math.max(...data.products.map((p: Product) => p.price))
        const newRange: [number, number] = [0, Math.ceil(maxPrice)]
        setPriceRange(newRange)
        setSelectedPriceRange(newRange)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [query, currentPage, selectedCategories, selectedPriceRange])

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setSelectedCategories((prev) => (checked ? [...prev, categoryId] : prev.filter((id) => id !== categoryId)))
    setCurrentPage(1)
  }

  const handlePriceRangeChange = (range: [number, number]) => {
    setSelectedPriceRange(range)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setSelectedCategories([])
    setSelectedPriceRange(priceRange)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            {query ? `Search results for "${query}"` : "All products"}
          </h1>
          <p className="text-gray-600">{totalCount} results found</p>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <SearchFilters
            categories={categories}
            priceRange={priceRange}
            selectedCategories={selectedCategories}
            selectedPriceRange={selectedPriceRange}
            onCategoryChange={handleCategoryChange}
            onPriceRangeChange={handlePriceRangeChange}
            onClearFilters={handleClearFilters}
          />

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-[#0071ce]" />
                <span className="ml-2 text-gray-600">Loading products...</span>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-xl font-medium text-gray-900 mb-2">No products found</h2>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalCount > 20 && (
                  <div className="flex items-center justify-center mt-8 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <span className="px-4 py-2 text-sm text-gray-600">
                      Page {currentPage} of {Math.ceil(totalCount / 20)}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      disabled={currentPage >= Math.ceil(totalCount / 20)}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <ChatBubble />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  )
}

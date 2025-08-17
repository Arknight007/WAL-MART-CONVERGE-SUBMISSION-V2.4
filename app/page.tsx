import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { CategoryGrid } from "@/components/category-grid"
import { ProductSection } from "@/components/product-section"
import { ChatBubble } from "@/components/ai-chat/chat-bubble"
import { createServerClient } from "@/lib/supabase/server"

async function getPatioProducts() {
  const supabase = createServerClient()

  const { data: products } = await supabase
    .from("products")
    .select(`
      *,
      categories!inner (
        name,
        slug
      )
    `)
    .eq("categories.slug", "patio-garden")
    .limit(6)

  return products || []
}

export default async function HomePage() {
  const patioProducts = await getPatioProducts()

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />
      <CategoryGrid />

      <ProductSection title="Save on patio & garden" products={patioProducts} />

      <ChatBubble />
    </div>
  )
}

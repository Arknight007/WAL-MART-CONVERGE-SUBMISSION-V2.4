import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)

    const query = searchParams.get("q") || ""
    const categories = searchParams.get("categories")?.split(",").filter(Boolean) || []
    const minPrice = searchParams.get("minPrice") ? Number.parseFloat(searchParams.get("minPrice")!) : 0
    const maxPrice = searchParams.get("maxPrice") ? Number.parseFloat(searchParams.get("maxPrice")!) : 10000
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = (page - 1) * limit

    // Build the query
    let productsQuery = supabase
      .from("products")
      .select(`
        *,
        categories (
          id,
          name,
          slug
        )
      `)
      .gte("price", minPrice)
      .lte("price", maxPrice)
      .range(offset, offset + limit - 1)

    // Add text search if query provided
    if (query) {
      productsQuery = productsQuery.or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    }

    // Add category filter if provided
    if (categories.length > 0) {
      productsQuery = productsQuery.in("category_id", categories)
    }

    const { data: products, error: productsError } = await productsQuery

    if (productsError) {
      console.error("Products query error:", productsError)
      return NextResponse.json({ error: "Failed to search products" }, { status: 500 })
    }

    // Get total count for pagination
    let countQuery = supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .gte("price", minPrice)
      .lte("price", maxPrice)

    if (query) {
      countQuery = countQuery.or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    }

    if (categories.length > 0) {
      countQuery = countQuery.in("category_id", categories)
    }

    const { count, error: countError } = await countQuery

    if (countError) {
      console.error("Count query error:", countError)
    }

    // Get categories with product counts for filters
    const { data: categoryData, error: categoryError } = await supabase.from("categories").select(`
        id,
        name,
        products (count)
      `)

    const categoriesWithCounts = categoryData?.map((cat) => ({
      id: cat.id,
      name: cat.name,
      count: cat.products?.[0]?.count || 0,
    }))

    return NextResponse.json({
      products: products || [],
      totalCount: count || 0,
      categories: categoriesWithCounts || [],
      pagination: {
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

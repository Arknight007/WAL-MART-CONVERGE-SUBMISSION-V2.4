import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 })
    }

    // Get recent products for context
    const supabase = createServerClient()
    const { data: products } = await supabase
      .from("products")
      .select(`
        id,
        name,
        description,
        price,
        original_price,
        categories (name)
      `)
      .limit(20)

    const productContext = products
      ? products
          .map(
            (p) =>
              `${p.name} - $${p.price}${p.original_price ? ` (was $${p.original_price})` : ""} - ${p.categories?.name} - ${p.description}`,
          )
          .join("\n")
      : ""

    const systemPrompt = `You are a helpful Walmart shopping assistant. You help customers find products, compare prices, and answer shopping questions.

Available products in our store:
${productContext}

Guidelines:
- Be friendly, helpful, and enthusiastic about helping customers save money
- Recommend products from our available inventory when relevant
- Mention specific prices and deals when discussing products
- Help with product comparisons and shopping decisions
- If asked about products not in our inventory, suggest similar alternatives from what we have
- Keep responses concise but informative
- Use Walmart's "Save Money. Live Better." philosophy in your recommendations

Current conversation context: The user is browsing our Walmart website and can add items to their cart.`

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      maxTokens: 500,
    })

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 })
  }
}

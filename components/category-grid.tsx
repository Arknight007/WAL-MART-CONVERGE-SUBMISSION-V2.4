import Image from "next/image"

const categories = [
  { name: "Grocery", image: "/assorted-groceries.png" },
  { name: "Home", image: "/cozy-living-room-chair.png" },
  { name: "Patio & Garden", image: "/outdoor-sofa.png" },
  { name: "Fashion", image: "/pink-fashion.png" },
  { name: "Tech", image: "/modern-laptop-setup.png" },
  { name: "Baby", image: "/baby-products-toys.png" },
  { name: "Toys", image: "/colorful-childrens-toys.png" },
  { name: "Health & wellness", image: "/health-wellness-products.png" },
  { name: "Personal Care", image: "/personal-care-products-collection.png" },
  { name: "Beauty", image: "/placeholder-87pko.png" },
]

export function CategoryGrid() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Get it all right here</h2>
          <button className="text-[#0071ce] hover:underline font-medium">View all</button>
        </div>

        <div className="grid grid-cols-5 lg:grid-cols-10 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center group cursor-pointer">
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden mb-2 group-hover:shadow-md transition-shadow">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm text-center text-gray-700 group-hover:text-[#0071ce]">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

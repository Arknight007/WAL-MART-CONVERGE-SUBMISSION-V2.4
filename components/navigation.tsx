import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const navItems = [
    { label: "Departments", hasDropdown: true },
    { label: "Services", hasDropdown: true },
    { label: "Get it Fast", hasDropdown: false },
    { label: "New Arrivals", hasDropdown: false },
    { label: "Back to School", hasDropdown: false },
    { label: "Rollbacks & More", hasDropdown: false },
    { label: "Dinner Made Easy", hasDropdown: false },
    { label: "Pharmacy Delivery", hasDropdown: false },
    { label: "College Shop", hasDropdown: false },
    { label: "My Items", hasDropdown: false },
    { label: "Auto Service", hasDropdown: false },
    { label: "Walmart+", hasDropdown: false },
  ]

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {navItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="h-12 px-4 text-sm font-medium text-gray-700 hover:text-[#0071ce] hover:bg-gray-50 rounded-none"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-4 h-4 ml-1" />}
              </Button>
            ))}
          </div>

          <Button
            variant="ghost"
            className="h-12 px-4 text-sm font-medium text-gray-700 hover:text-[#0071ce] hover:bg-gray-50 rounded-none"
          >
            More
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </nav>
  )
}

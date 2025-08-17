"use client"

import type React from "react"

import { Search, ShoppingCart, MapPin, ChevronDown, User, RotateCcw, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/contexts/cart-context"
import { CartDropdown } from "./cart-dropdown"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import { signOut } from "@/lib/actions"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Header() {
  const { state } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="bg-[#0071ce] text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Left section - Logo and Location */}
          <div className="flex items-center gap-6">
            {/* Walmart Logo */}
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-[#ffc220] rounded-full flex items-center justify-center mr-2">
                <div className="w-6 h-6 bg-[#0071ce] rounded-full relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1 h-1 bg-[#ffc220] rounded-full"></div>
                  </div>
                  {/* Spark rays */}
                  <div className="absolute -top-1 left-1/2 w-0.5 h-2 bg-[#ffc220] transform -translate-x-1/2"></div>
                  <div className="absolute -bottom-1 left-1/2 w-0.5 h-2 bg-[#ffc220] transform -translate-x-1/2"></div>
                  <div className="absolute -left-1 top-1/2 w-2 h-0.5 bg-[#ffc220] transform -translate-y-1/2"></div>
                  <div className="absolute -right-1 top-1/2 w-2 h-0.5 bg-[#ffc220] transform -translate-y-1/2"></div>
                </div>
              </div>
            </Link>

            {/* Location Selector */}
            <div className="flex items-center gap-2 cursor-pointer hover:bg-[#004f9f] px-3 py-2 rounded">
              <MapPin className="w-4 h-4" />
              <div className="text-sm">
                <div className="font-medium">Pickup or delivery?</div>
                <div className="text-xs opacity-90">Sacramento, 95829 • Sacramento Supercenter</div>
              </div>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* Center section - Search */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search everything at Walmart online and in store"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-4 pr-12 rounded-full border-0 text-black placeholder:text-gray-500"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1 h-10 w-10 rounded-full bg-[#ffc220] hover:bg-[#ffb800] text-black p-0"
              >
                <Search className="w-5 h-5" />
              </Button>
            </form>
          </div>

          {/* Right section - Account and Cart */}
          <div className="flex items-center gap-6">
            {/* Reorder */}
            <div className="flex items-center gap-2 cursor-pointer hover:bg-[#004f9f] px-3 py-2 rounded">
              <RotateCcw className="w-5 h-5" />
              <div className="text-sm">
                <div className="text-xs opacity-90">Reorder</div>
                <div className="font-medium">My Items</div>
              </div>
            </div>

            {/* Sign In / User Account */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2">
                  <User className="w-5 h-5" />
                  <div className="text-sm">
                    <div className="text-xs opacity-90">Hello</div>
                    <div className="font-medium">{user.email?.split("@")[0]}</div>
                  </div>
                </div>
                <form action={signOut}>
                  <Button type="submit" variant="ghost" size="sm" className="text-white hover:bg-[#004f9f] p-2">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            ) : (
              <Link href="/auth/login">
                <div className="flex items-center gap-2 cursor-pointer hover:bg-[#004f9f] px-3 py-2 rounded">
                  <User className="w-5 h-5" />
                  <div className="text-sm">
                    <div className="text-xs opacity-90">Sign In</div>
                    <div className="font-medium">Account</div>
                  </div>
                </div>
              </Link>
            )}

            {/* Cart */}
            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer hover:bg-[#004f9f] px-3 py-2 rounded"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  {state.itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#ffc220] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {state.itemCount}
                    </span>
                  )}
                </div>
                <div className="text-sm font-medium">${state.total.toFixed(2)}</div>
              </div>

              <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

"use client"

import Link from "next/link"
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"


export default function Header() {
  const router = useRouter();
  return (
    <>
    <header className="bg-black px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2">
            <img src="/images/jiocinemalogo.png" alt=""  />
          </div>
          <span className="text-white font-semibold text-xl">JioCinema</span>
        </Link>

        {/* Premium Button */}
        <Button
          variant="outline"
          size="lg"
          className="h-7 px-3 rounded-full border-yellow-500 bg-transparent text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400"
        >
          <span className="text-sm">✦</span> Go Premium
        </Button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-white text-lg hover:text-white/80">
            Home
          </Link>
          <Link href="/movies" className="text-white/70 text-lg hover:text-white">
            Movies
          </Link>
          <Link href="/tv-shows" className="text-white/70 text-lg hover:text-white">
            Tv Shows
          </Link>
          <Link href="/watchlist" className="text-white/70 text-lg hover:text-white">
            Watchlist
          </Link>
          <Link href="/jio-plus" className="text-white/70 text-lg hover:text-white flex items-center">
            Jio+
            <ChevronDown className="ml-1 h-3 w-3" />
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
          {/* Search */}
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-transparent">
            <Search className="h-5 w-5" />
          </Button>

          {/* User Profile / Login Button */}
          <button
          onClick={() => router.push("/login")} // Redirects to login page
          className="w-8 h-8 rounded-full flex items-center justify-center"
          >
            <img src="/images/user.jpg" alt="User" className="w-8 h-8  rounded-full" />
          </button>
      </div>
    </header>
    
    </>
  )
}


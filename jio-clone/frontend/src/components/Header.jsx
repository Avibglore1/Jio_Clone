"use client"
import Image from "./../../public/file.svg"
import Link from "next/link"
import { useState } from "react"
import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import AuthModal from "@/app/profile/page"

export default function Header() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  return (
    <>
    <header className="bg-black/95 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center mr-2">
            <span className="text-white font-bold text-sm">JC</span>
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
          <button onClick={() => setAuthModalOpen(true)} className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
            <img src={Image} alt="User profile" className="object-cover" />
          </button>
      </div>
    </header>
    <AuthModal open={authModalOpen} setOpen={setAuthModalOpen} />
    </>
  )
}


"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Search, ChevronDown, ExternalLink, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Function to determine if a link is active
  const isActive = (path) => pathname === path;

  // Handle login button click
  const handleLogin = () => {
    setOpen(false); // Close the sheet
    router.push("/login"); // Navigate to login
  };

  return (
    <header className="bg-black px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2">
            <Image src="/jiocinemalogo.png" alt="JioCinema Logo" height={30} width={30} />
          </div>
          <span className="text-white font-semibold text-xl">JioCinema</span>
        </Link>

        {/* Premium Button */}
        <Link href="/subscription">
          <Button
            variant="outline"
            size="lg"
            className="h-7 px-3 rounded-full border-yellow-500 bg-transparent text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400"
          >
            <span className="text-sm">✦</span> Go Premium
          </Button>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {[
            { name: "Home", path: "/" },
            { name: "Movies", path: "/movies" },
            { name: "Tv Shows", path: "/tv-shows" },
            { name: "Watchlist", path: "/watchlist" },
            { name: "Jio+", path: "/jio-plus", icon: <ChevronDown className="ml-1 h-3 w-3" /> },
          ].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-lg hover:text-white relative ${
                isActive(item.path) ? "text-white" : "text-white/70"
              } flex items-center`}
            >
              {item.name} {item.icon}
              {isActive(item.path) && (
                <span className="absolute bottom-[-8px] left-0 w-full h-1 bg-pink-500 rounded-t-sm"></span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#191919] text-white placeholder-white/70 text-sm pl-10 pr-4 py-2 rounded-full focus:outline-none border border-transparent focus:border-gray-600"
          />
        </div>

        {/* User Profile with Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="w-8 h-8 rounded-full flex items-center justify-center">
              <Image src="/user.jpg" alt="User" className="w-8 h-8 rounded-full" height={20} width={20} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black text-white w-80">
            <SheetTitle className="sr-only">User Profile</SheetTitle> {/* Hidden for accessibility */}
            
            {/* Profile Section */}
            <div className="flex flex-col items-center p-5 border-b border-gray-700">
              <Image src="/user.jpg" alt="User" className="w-20 h-20 rounded-full" height={80} width={80} />
              <h3 className="mt-3 text-xl font-semibold">Guest</h3>
              <Button className="mt-3 bg-pink-600 text-white px-6 rounded-full hover:bg-pink-500"
                onClick={handleLogin}>
                Login
              </Button>
            </div>

            {/* Menu Items */}
            <div className="mt-4 text-gray-300">
              <ul className="space-y-4">
                {[
                { name: "Subscribe Now", path: "/subscription"},  
                { name: "Home", path: "/" },
                { name: "Movies", path: "/movies" },
                { name: "Tv Shows", path: "/tv-shows" },
                { name: "Watchlist", path: "/watchlist" },
                { name: "Jio+", path: "/jio-plus" },
              ].map((item) => (
                <li key={item.path}>
                  <Link 
                    href={item.path}
                    className="flex justify-between items-center px-4 py-2 hover:bg-gray-800 cursor-pointer w-full"
                    onClick={() => setOpen(false)} // Close the sheet when clicked
                  >
                    {item.name} <ExternalLink className="w-4 h-4" />
                  </Link>
                </li>
                ))}
                <li className="flex justify-between items-center px-4 py-2 hover:bg-gray-800 cursor-pointer">
                  Help and Legal <ChevronDown className="w-4 h-4" />
                </li>
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

import { Menu,Search } from "lucide-react";
import AuthModal from "./AuthModal";
const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-black text-white">
      <h1 className="text-2xl font-bold">JioCinema</h1>
      <div className="flex gap-6">
        <a href="/" className="hover:text-red-500">Home</a>
        <a href="/movies" className="hover:text-red-500">Movies</a>
        <a href="/tv-shows" className="hover:text-red-500">TV Shows</a>
      </div>
      <div className="flex gap-4">
        <Menu className="w-6 h-6 cursor-pointer" />
        <Search className="w-6 h-6 cursor-pointer" />
        <AuthModal />
      </div>
    </nav>
  );
};

export default Navbar;

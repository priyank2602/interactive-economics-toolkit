import { Search, User } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/placeholder.svg" alt="iEAT Logo" className="h-8 w-8" />
          <span className="font-semibold text-xl">iEAT</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <button className="nav-link">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
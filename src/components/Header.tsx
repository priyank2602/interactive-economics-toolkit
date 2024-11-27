import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#141414]/80 backdrop-blur-md z-50 border-b border-[#333333]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/placeholder.svg" alt="iEAT Logo" className="h-8 w-8" />
          <span className="font-semibold text-xl text-white">iEAT</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <button className="rounded-full hover:ring-2 hover:ring-primary/20 transition-all">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 bg-[#141414] border-[#333333]">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">John Doe</h4>
                  <p className="text-sm text-gray-400">john.doe@example.com</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="text-sm">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-400">Role</span>
                    <span className="font-medium text-white">Analyst</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-400">Department</span>
                    <span className="font-medium text-white">Research</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-400">Location</span>
                    <span className="font-medium text-white">New York</span>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};
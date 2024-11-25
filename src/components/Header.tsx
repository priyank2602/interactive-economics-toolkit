import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/placeholder.svg" alt="iEAT Logo" className="h-8 w-8" />
          <span className="font-semibold text-xl">iEAT</span>
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
            <PopoverContent className="w-80 p-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">John Doe</h4>
                  <p className="text-sm text-gray-500">john.doe@example.com</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="text-sm text-gray-500">
                  <div className="flex justify-between py-1">
                    <span>Role</span>
                    <span className="font-medium text-gray-900">Analyst</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Department</span>
                    <span className="font-medium text-gray-900">Research</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Location</span>
                    <span className="font-medium text-gray-900">New York</span>
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
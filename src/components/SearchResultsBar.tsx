import { Plus, Upload, ArrowUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchResultsBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`, { replace: true });
    }
  };

  const handleAttachment = () => {
    // Implement attachment functionality
    console.log("Attachment clicked");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-[#333333] p-4 animate-slide-in">
      <div className="max-w-4xl mx-auto flex items-center gap-4">
        <form onSubmit={handleSearch} className="flex-1 flex items-center gap-3">
          <div className="relative flex-1">
            <Plus 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary cursor-pointer hover:text-primary transition-colors"
              onClick={() => setIsExpanded(!isExpanded)}
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask follow-up"
              className="w-full pl-12 pr-12 py-6 bg-[#141414] border-[#333333] text-white placeholder:text-secondary"
            />
            <Upload 
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary cursor-pointer hover:text-primary transition-colors"
              onClick={handleAttachment}
            />
          </div>
          <button
            type="submit"
            className="bg-[#141414] hover:bg-[#1a1a1a] text-secondary hover:text-primary border border-[#333333] rounded-full p-2 transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
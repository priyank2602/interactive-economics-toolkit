import { Search } from "lucide-react";
import { useState } from "react";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [recentSearches] = useState([
    "Economic outlook 2024",
    "Interest rates forecast",
    "GDP growth analysis",
    "Market volatility index",
    "Banking sector performance",
  ]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search economic insights..."
          className="search-input"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
      
      {recentSearches.length > 0 && (
        <div className="space-y-2 animate-fade-in">
          <p className="text-sm text-secondary">Recent Searches</p>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
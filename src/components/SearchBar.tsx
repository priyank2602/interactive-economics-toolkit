import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([
    "Economic outlook 2024",
    "Interest rates forecast",
    "GDP growth analysis",
    "Market volatility index",
    "Banking sector performance",
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
      navigate(`/search?q=${encodeURIComponent(query)}`, { replace: true });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about economic insights..."
          className="material-input pl-12"
        />
        <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2">
          <Search className="text-gray-400 dark:text-gray-500" />
        </button>
      </form>
      
      {recentSearches.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">Suggested Queries</p>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => setQuery(search)}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full 
                         hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors
                         text-gray-700 dark:text-gray-300"
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
import { Search } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
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
      // Add the new search to recent searches
      setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
      // Simulate search results (replace with actual API call in production)
      setSearchResults([
        `Market Analysis for "${query}"`,
        `Economic Impact of ${query}`,
        `Financial Trends: ${query}`,
      ]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search economic insights..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pl-4 pr-10"
        />
        <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2">
          <Search className="text-gray-400" />
        </button>
      </form>
      
      {searchResults.length > 0 && (
        <div className="mt-6 animate-fade-in">
          <Tabs defaultValue="market">
            <TabsList className="w-full">
              <TabsTrigger value="market">Market Analysis</TabsTrigger>
              <TabsTrigger value="economic">Economic Impact</TabsTrigger>
              <TabsTrigger value="financial">Financial Trends</TabsTrigger>
            </TabsList>
            <TabsContent value="market" className="mt-4">
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Market Analysis Results</h3>
                <p>{searchResults[0]}</p>
              </div>
            </TabsContent>
            <TabsContent value="economic" className="mt-4">
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Economic Impact Results</h3>
                <p>{searchResults[1]}</p>
              </div>
            </TabsContent>
            <TabsContent value="financial" className="mt-4">
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Financial Trends Results</h3>
                <p>{searchResults[2]}</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
      
      {recentSearches.length > 0 && !searchResults.length && (
        <div className="space-y-2 animate-fade-in">
          <p className="text-sm text-secondary">Recent Searches</p>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => setQuery(search)}
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